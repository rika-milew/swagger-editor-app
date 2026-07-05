import { type SwaggerSchema } from './types';

export const mockSwagger: SwaggerSchema = {
  info: {
    title: 'Nexus Core API',
    version: '1.2.4',
  },
  paths: {
    '/users': {
      get: {
        summary: 'Get all users',
      },
      post: {
        summary: 'Create user',
      },
      put: {
        summary: 'Replace users',
      },
      patch: {
        summary: 'Update users',
      },
      delete: {
        summary: 'Delete users',
      },
    },

    '/users/{id}': {
      get: {
        summary: 'Get user by id',
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

    '/auth/login': {
      post: {
        summary: 'Login user',
      },
    },

    '/auth/logout': {
      post: {
        summary: 'Logout user',
      },
    },
  },
};
