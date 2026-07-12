import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { HTTP_STATUS } from '@/constants/http-status';
import type { RequestInput } from '@/lib/validation/request-schema';
import { isProxyRequest, isInternalUrl, isRequestMethod } from '@/types/guards';
import { recordHistory } from '@/app/actions/history';

const PROXY_TIMEOUT_MS = 10_000;

type ProxyRequestParsed = {
  url: string;
  method: RequestInput['request_method'];
  headers: Record<string, string>;
  body?: string;
};

type ProxyResult = {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
};

function parseRequest(payload: unknown): ProxyRequestParsed | null {
  if (!isProxyRequest(payload)) {
    return null;
  }

  const rawMethod = typeof payload.method === 'string' ? payload.method : 'GET';
  const method = isRequestMethod(rawMethod) ? rawMethod : 'GET';

  return {
    url: payload.url,
    method,
    headers: payload.headers ?? {},
    body: payload.body,
  };
}

async function fetchExternal(
  targetUrl: string,
  method: string,
  headers: Record<string, string>,
  body?: string,
): Promise<ProxyResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROXY_TIMEOUT_MS);

  try {
    const response = await fetch(targetUrl, {
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
      body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
      signal: controller.signal,
      redirect: 'manual',
    });

    const responseBody = await response.text();

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      if (
        ![
          'content-encoding',
          'transfer-encoding',
          'cf-ray',
          'cf-cache-status',
          'report-to',
          'reporting-endpoints',
          'nel',
          'server',
          'alt-svc',
        ].includes(key.toLowerCase())
      ) {
        responseHeaders[key] = value;
      }
    });

    return {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body: responseBody,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload: unknown = await request.json();

    const parsed = parseRequest(payload);

    if (!parsed) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    const { url, method, headers, body } = parsed;

    if (isInternalUrl(url)) {
      return NextResponse.json(
        { error: 'Requests to internal addresses are not allowed' },
        { status: HTTP_STATUS.FORBIDDEN },
      );
    }

    const startTime = Date.now();

    try {
      const result = await fetchExternal(url, method, headers, body);
      const duration = Date.now() - startTime;

      await recordHistory({
        targetUrl: url,
        method,
        body,
        responseStatus: result.status,
        responseBody: result.body,
        duration,
        errorDetails:
          result.status < HTTP_STATUS.BAD_REQUEST
            ? null
            : `HTTP ${String(result.status)}: ${result.statusText}`,
      });

      return NextResponse.json(
        { ...result, duration },
        { status: result.status },
      );
    } catch (error) {
      const duration = Date.now() - startTime;

      await recordHistory({
        targetUrl: url,
        method,
        body,
        responseStatus: null,
        responseBody: null,
        duration,
        errorDetails: error instanceof Error ? error.message : 'Request failed',
      });

      return NextResponse.json(
        { error: 'Failed to reach the target URL' },
        { status: HTTP_STATUS.BAD_GATEWAY },
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }
}
