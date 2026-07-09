export const HTTP_METHODS = ['get', 'post', 'put', 'delete', 'patch'] as const;

export type HttpMethod = (typeof HTTP_METHODS)[number];

export type SwaggerInfo = {
  title: string;
  version: string;
};

export type SwaggerSchema = {
  info: SwaggerInfo;
  paths: Record<string, PathItem>;
};

export type PathItem = Partial<Record<HttpMethod, OperationObject>>;

export type OperationObject = {
  summary?: string;
  description?: string;
};
