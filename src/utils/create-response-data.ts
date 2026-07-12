import type { ResponseData } from '@/types/viewer.types';
import { HTTP_STATUS } from '@/constants/http-status';

const DEFAULT_RESPONSE: ResponseData = {
  status: HTTP_STATUS.NETWORK_ERROR,
  statusText: 'Error',
  headers: {},
  body: '',
  duration: 0,
};

export const createResponseData = (
  overrides: Partial<ResponseData> = {},
): ResponseData => ({
  ...DEFAULT_RESPONSE,
  ...overrides,
});
