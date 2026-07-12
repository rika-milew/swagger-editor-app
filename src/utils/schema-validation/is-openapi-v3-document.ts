import type { OpenAPIV3 } from 'openapi-types';

export const isOpenAPIV3Document = (
  schema: object,
): schema is OpenAPIV3.Document => {
  return (
    'openapi' in schema &&
    typeof schema.openapi === 'string' &&
    'info' in schema &&
    typeof schema.info === 'object' &&
    schema.info !== null &&
    'paths' in schema
  );
};
