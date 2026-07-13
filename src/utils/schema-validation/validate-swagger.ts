import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV3, OpenAPIV2 } from 'openapi-types';

export const validateSwagger = async (
  schema: OpenAPIV3.Document | OpenAPIV2.Document,
): Promise<void> => {
  const parser = new SwaggerParser();

  await parser.validate(schema);
};
