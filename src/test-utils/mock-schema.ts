import type { SwaggerSchema } from '@/components/swagger-viewer/types';

export const createMockSchema = (
  overrides: Partial<SwaggerSchema> = {},
): SwaggerSchema => ({
  info: {
    title: 'Test API',
    version: '1.0.0',
    ...overrides.info,
  },

  paths: {
    '/users': {
      get: {
        summary: 'Get all users',
        responses: {
          '200': {
            description: 'Successful response',
          },
        },
      },
    },

    ...overrides.paths,
  },
});
