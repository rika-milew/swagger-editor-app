import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type ProxyRequest = {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

const BLOCKED_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1']);

function isInternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return BLOCKED_HOSTS.has(parsed.hostname);
  } catch {
    return true;
  }
}

function isProxyRequest(value: unknown): value is ProxyRequest {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return (
    'url' in value && typeof value.url === 'string' && value.url.length > 0
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload: unknown = await request.json();

    if (!isProxyRequest(payload)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 },
      );
    }
    const targetUrl = payload.url;
    const method = payload.method ?? 'GET';
    const headers = payload.headers ?? {};
    const body = payload.body;

    if (isInternalUrl(targetUrl)) {
      return NextResponse.json(
        { error: 'Requests to internal addresses are not allowed' },
        { status: 403 },
      );
    }

    const startTime = Date.now();

    try {
      const response = await fetch(targetUrl, {
        method,
        headers: { 'Content-Type': 'application/json', ...headers },
        body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
      });

      const responseBody = await response.text();
      const duration = Date.now() - startTime;

      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      return NextResponse.json({
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        body: responseBody,
        duration,
      });
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Request failed' },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 },
    );
  }
}
