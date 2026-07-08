import { describe, it, expect } from 'vitest';
import { getLocaleFromPath } from './get-locale';

describe('getLocaleFromPath', () => {
  it('should return en for English locale path', () => {
    expect(getLocaleFromPath('/en/about')).toBe('en');
  });

  it('should return ru for Russian locale path', () => {
    expect(getLocaleFromPath('/ru/contact')).toBe('ru');
  });

  it('should return en for unsupported locale', () => {
    expect(getLocaleFromPath('/fr/page')).toBe('en');
  });

  it('should return en for path without locale', () => {
    expect(getLocaleFromPath('/page')).toBe('en');
  });

  it('should return en for root path', () => {
    expect(getLocaleFromPath('/')).toBe('en');
  });
});
