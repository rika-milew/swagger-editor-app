import {
  type SwaggerSchema,
  type HttpMethod,
  HTTP_METHODS,
} from '@/components/swagger-viewer/types';

export function isHttpMethod(method: string): method is HttpMethod {
  for (const m of HTTP_METHODS) {
    if (m === method) {
      return true;
    }
  }

  return false;
}

export type Endpoint = {
  path: string;
  method: HttpMethod;
  summary?: string;
};

export function parseSwagger(schema: SwaggerSchema): Endpoint[] {
  const result: Endpoint[] = [];

  for (const path in schema.paths) {
    const methods = schema.paths[path];

    for (const method in methods) {
      if (!isHttpMethod(method)) {
        continue;
      }

      const operation = methods[method];

      if (!operation) {
        continue;
      }

      result.push({
        path,
        method,
        summary: operation.summary,
      });
    }
  }

  return result;
}
