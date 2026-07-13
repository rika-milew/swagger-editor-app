import type { OpenAPIV3, OpenAPIV2 } from 'openapi-types';

export const isOpenAPIDocument = (
  schema: object,
): schema is OpenAPIV3.Document | OpenAPIV2.Document => {
  const hasInfo =
    'info' in schema && typeof schema.info === 'object' && schema.info !== null;

  const hasPaths = 'paths' in schema;

  const isV3 = 'openapi' in schema && typeof schema.openapi === 'string';

  const isV2 = 'swagger' in schema && typeof schema.swagger === 'string';

  return hasInfo && hasPaths && (isV3 || isV2);
};
