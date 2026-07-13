import { z } from 'zod';

const URL_MAX_LENGTH = 2000;
const ERROR_DETAILS_MAX_LENGTH = 5000;
const HTTP_STATUS_MIN = 100;
const HTTP_STATUS_MAX = 599;

export const requestSchema = z.object({
  endpoint_url: z.string().min(1, 'URL is required').max(URL_MAX_LENGTH),
  request_method: z.enum([
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
    'HEAD',
    'OPTIONS',
  ]),
  request_size: z.number().min(0),
  response_status_code: z
    .number()
    .int()
    .min(HTTP_STATUS_MIN)
    .max(HTTP_STATUS_MAX)
    .nullable(),
  response_size: z.number().min(0).nullable(),
  request_duration: z.number().min(0).nullable(),
  error_details: z.string().max(ERROR_DETAILS_MAX_LENGTH).nullable(),
});

export type RequestInput = z.infer<typeof requestSchema>;
