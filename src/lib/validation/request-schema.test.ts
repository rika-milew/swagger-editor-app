import { describe, it, expect } from 'vitest';
import { requestSchema } from '@/lib/validation/request-schema';

const validRequest = {
  endpoint_url: '/api/test',
  request_method: 'GET' as const,
  request_size: 100,
  request_timestamp: new Date().toISOString(),
  response_status_code: 200,
  response_size: 50,
  request_duration: 150,
  error_details: null,
};

describe('requestSchema', () => {
  it('accepts valid request', () => {
    const result = requestSchema.safeParse(validRequest);

    expect(result.success).toBe(true);
  });

  it('rejects empty endpoint_url', () => {
    const result = requestSchema.safeParse({
      ...validRequest,
      endpoint_url: '',
    });

    expect(result.success).toBe(false);
  });

  it('rejects invalid request_method', () => {
    const result = requestSchema.safeParse({
      ...validRequest,
      request_method: 'INVALID',
    });

    expect(result.success).toBe(false);
  });

  it('rejects negative request_size', () => {
    const result = requestSchema.safeParse({
      ...validRequest,
      request_size: -1,
    });

    expect(result.success).toBe(false);
  });

  it('accepts null response_status_code', () => {
    const result = requestSchema.safeParse({
      ...validRequest,
      response_status_code: null,
    });

    expect(result.success).toBe(true);
  });

  it('rejects response_status_code below 100', () => {
    const result = requestSchema.safeParse({
      ...validRequest,
      response_status_code: 99,
    });

    expect(result.success).toBe(false);
  });

  it('rejects response_status_code above 599', () => {
    const result = requestSchema.safeParse({
      ...validRequest,
      response_status_code: 600,
    });

    expect(result.success).toBe(false);
  });

  it('accepts null response_size', () => {
    const result = requestSchema.safeParse({
      ...validRequest,
      response_size: null,
    });

    expect(result.success).toBe(true);
  });

  it('rejects negative response_size', () => {
    const result = requestSchema.safeParse({
      ...validRequest,
      response_size: -1,
    });

    expect(result.success).toBe(false);
  });

  it('accepts null request_duration', () => {
    const result = requestSchema.safeParse({
      ...validRequest,
      request_duration: null,
    });

    expect(result.success).toBe(true);
  });

  it('rejects negative request_duration', () => {
    const result = requestSchema.safeParse({
      ...validRequest,
      request_duration: -1,
    });

    expect(result.success).toBe(false);
  });

  it('accepts null error_details', () => {
    const result = requestSchema.safeParse({
      ...validRequest,
      error_details: null,
    });

    expect(result.success).toBe(true);
  });

  it('accepts all HTTP methods', () => {
    const methods = [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH',
      'HEAD',
      'OPTIONS',
    ];

    for (const method of methods) {
      const result = requestSchema.safeParse({
        ...validRequest,
        request_method: method,
      });

      expect(result.success).toBe(true);
    }
  });
});
