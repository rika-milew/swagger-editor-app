import { type SwaggerSchema } from './types';

export const mockSwagger: SwaggerSchema = {
  /*info: {
    title: 'API',
    version: '1.0.0',
  },
  paths: {},*/
  info: {
    title: 'Nexus Core API',
    version: '1.2.4',
  },
  paths: {
    '/users/{id}': {
      get: {
        summary: 'Get user by id',

        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              example: '123',
            },
          },

          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: {
              type: 'number',
              example: 10,
            },
          },

          {
            name: 'Authorization',
            in: 'header',
            required: true,
            schema: {
              type: 'string',
              example: 'Bearer token',
            },
          },

          {
            name: 'sessionId',
            in: 'cookie',
            required: false,
            schema: {
              type: 'string',
              example: 'abc123',
            },
          },
        ],

        responses: {
          '200': {
            description: 'User found',

            content: {
              'application/json': {
                example: {
                  id: 123,
                  name: 'John',
                },
              },
            },
          },

          '404': {
            description: 'User not found',
          },
        },
      },

      post: {
        summary: 'Create user',

        requestBody: {
          required: true,

          content: {
            'application/json': {
              example: {
                name: 'Alice',
                email: 'alice@test.com',
              },

              schema: {
                type: 'object',
              },
            },
          },
        },

        responses: {
          '201': {
            description: 'User created',
          },

          '400': {
            description: 'Validation error',
          },
        },
      },

      put: {
        summary: 'Replace user',
      },

      patch: {
        summary: 'Update user',
      },

      delete: {
        summary: 'Delete user',
      },
    },
  },
};
