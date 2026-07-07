import { describe, it, expect, vi, beforeEach } from 'vitest';
import { translateError } from './translate-error';

vi.mock('@/lib/database/dto/error-key.dto', () => ({
  databaseErrorMap: {
    DB_001: 'database.errors.connection',
    DB_002: 'database.errors.timeout',
  },
}));

describe('translateError', () => {
  let mockT: (key: string) => string;

  beforeEach(() => {
    mockT = vi.fn((key: string) => `translated:${key}`);
  });

  it('should translate validation error messages', () => {
    const result = translateError('validationErrors.required', mockT);
    expect(result).toBe('translated:validationErrors.required');
    expect(mockT).toHaveBeenCalledWith('validationErrors.required');
  });

  it('should translate server error messages', () => {
    const result = translateError('serverErrors.internal', mockT);
    expect(result).toBe('translated:serverErrors.internal');
    expect(mockT).toHaveBeenCalledWith('serverErrors.internal');
  });

  it('should map database error codes', () => {
    const result = translateError('DB_001', mockT);
    expect(result).toBe('translated:database.errors.connection');
    expect(mockT).toHaveBeenCalledWith('database.errors.connection');
  });

  it('should return default message for unmapped errors', () => {
    const result = translateError('Some random error', mockT);
    expect(result).toBe('translated:serverErrors.default');
    expect(mockT).toHaveBeenCalledWith('serverErrors.default');
  });

  it('should return default error for empty message', () => {
    const result = translateError('', mockT);
    expect(result).toBe('translated:serverErrors.default');
    expect(mockT).toHaveBeenCalledWith('serverErrors.default');
  });
});
