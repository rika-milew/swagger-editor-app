import { useMemo } from 'react';
import type { BaseUrl } from '@/components/swagger-viewer/baseurl-selector/baseurl-selector';

type SwaggerSchema = {
  openapi?: string;
  swagger?: string;
  servers?: BaseUrl[];
  host?: string;
  basePath?: string;
  schemes?: string[];
};

export const useSwaggerServers = (schema: SwaggerSchema | null): BaseUrl[] => {
  return useMemo(() => {
    if (!schema) {
      return [];
    }

    if ('openapi' in schema && schema.openapi) {
      return schema.servers ?? [];
    }

    if ('swagger' in schema && schema.swagger) {
      const { host, basePath = '', schemes = ['https'] } = schema;

      if (!host) {
        return [];
      }

      return schemes.map((scheme: string) => ({
        url: `${scheme}://${host}${basePath}`,
        description: `${scheme.toUpperCase()} endpoint`,
      }));
    }

    return [];
  }, [schema]);
};
