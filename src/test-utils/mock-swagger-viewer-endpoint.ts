import type { Endpoint } from '@/utils/parse-swagger';

export const createMockEndpoint = (
  overrides: Partial<Endpoint> = {},
): Endpoint => ({
  path: '/users',
  method: 'get',
  summary: 'Get users',
  parameters: [],
  responses: {
    '200': {
      description: 'Success',
    },
  },

  ...overrides,
});
