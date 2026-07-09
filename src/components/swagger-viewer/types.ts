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

export type ParameterLocation = 'path' | 'query' | 'header' | 'cookie';

export type SwaggerParameter = {
  name: string;
  in: ParameterLocation;
  required?: boolean;

  schema?: {
    type?: string;
    example?: unknown;
  };
};

export type RequestBody = {
  required?: boolean;

  content?: Record<
    string,
    {
      schema?: unknown;
      example?: unknown;
    }
  >;
};

export type ResponseObject = {
  description?: string;

  content?: Record<
    string,
    {
      schema?: unknown;
      example?: unknown;
    }
  >;
};

export type OperationObject = {
  summary?: string;
  description?: string;

  parameters?: SwaggerParameter[];

  requestBody?: RequestBody;

  responses?: Record<string, ResponseObject>;
};

export type EndpointDetailsTranslations = {
  parameters: string;
  requestBody: string;
  responses: string;
};
