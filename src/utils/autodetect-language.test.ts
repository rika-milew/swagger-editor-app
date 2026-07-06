import { describe, it, expect } from 'vitest';
import { detectLanguage } from './autodetect-language';

describe('detectLanguage', () => {
  it('should return yaml for empty string', () => {
    expect(detectLanguage('')).toBe('yaml');
  });

  it('should detect json format', () => {
    expect(detectLanguage('{"valid": "json"}')).toBe('json');
  });

  it('should detect yaml format', () => {
    expect(detectLanguage('key: value')).toBe('yaml');
  });
});
