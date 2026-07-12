import { buildUrl, buildHeaders } from '@/utils/try-it-out-utils';
import type { SwaggerParameter } from '@/types/viewer.types';
import type { Endpoint } from '@/utils/parse-swagger';
import { METHODS_WITH_BODY } from '@/constants/http-status';

type CurlInput = {
  baseUrl: string;
  path: string;
  method: string;
  parameters: SwaggerParameter[];
  paramValues: Record<string, string>;
  bodyValue: string;
};

export function generateCurl({
  baseUrl,
  path,
  method,
  parameters,
  paramValues,
  bodyValue,
}: CurlInput): string {
  const url = buildUrl(baseUrl, path, parameters, paramValues);
  const headers = buildHeaders(parameters, paramValues);

  const command: string[] = [`curl -X ${method.toUpperCase()}`];

  Object.entries(headers).forEach(([key, value]) => {
    command.push(`  -H '${key}: ${value}'`);
  });

  if (METHODS_WITH_BODY.has(method.toUpperCase()) && bodyValue) {
    command.push(`  -d '${bodyValue.replaceAll("'", String.raw`\'`)}'`);
  }

  command.push(`  '${url}'`);

  return command.join(' \\\n');
}

export function createCurlCommand(
  baseUrl: string,
  endpoint: Endpoint,
  paramValues: Record<string, string>,
  bodyValue: string,
): string {
  return generateCurl({
    baseUrl,
    path: endpoint.path,
    method: endpoint.method,
    parameters: endpoint.parameters ?? [],
    paramValues,
    bodyValue,
  });
}
