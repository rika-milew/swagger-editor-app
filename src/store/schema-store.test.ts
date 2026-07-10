import { describe, it, expect, beforeEach } from 'vitest';
import { useSchemaStore } from './schema-store';

describe('useSchemaStore', () => {
  beforeEach(() => {
    useSchemaStore.setState({
      code: '',
      format: 'yaml',
    });
  });

  it('should have correct default values', () => {
    const state = useSchemaStore.getState();

    expect(state.code).toBe('');
    expect(state.format).toBe('yaml');
  });

  it('should update code while preserving format', () => {
    const store = useSchemaStore.getState();

    store.setCode('type: object');

    const updatedState = useSchemaStore.getState();
    expect(updatedState.code).toBe('type: object');
    expect(updatedState.format).toBe('yaml');
  });

  it('should handle empty string in setCode', () => {
    useSchemaStore.getState().setCode('test');
    useSchemaStore.getState().setCode('');

    expect(useSchemaStore.getState().code).toBe('');
  });

  it('should update format while preserving code', () => {
    const store = useSchemaStore.getState();

    store.setFormat('json');

    const updatedState = useSchemaStore.getState();
    expect(updatedState.format).toBe('json');
    expect(updatedState.code).toBe('');
  });

  it('should support multiple format changes', () => {
    const store = useSchemaStore.getState();

    store.setFormat('json');
    expect(useSchemaStore.getState().format).toBe('json');

    store.setFormat('yaml');
    expect(useSchemaStore.getState().format).toBe('yaml');
  });

  it('should set both code and format simultaneously with loadSchema', () => {
    const store = useSchemaStore.getState();

    store.loadSchema('{"type": "object"}', 'json');

    const state = useSchemaStore.getState();
    expect(state.code).toBe('{"type": "object"}');
    expect(state.format).toBe('json');
  });

  it('should override existing values with loadSchema', () => {
    const store = useSchemaStore.getState();
    store.setCode('old code');
    store.setFormat('yaml');

    store.loadSchema('new code', 'json');

    const state = useSchemaStore.getState();
    expect(state.code).toBe('new code');
    expect(state.format).toBe('json');
  });

  it('should reset to default values with clearSchema', () => {
    const store = useSchemaStore.getState();
    store.loadSchema('test schema', 'json');

    store.clearSchema();

    const state = useSchemaStore.getState();
    expect(state.code).toBe('');
    expect(state.format).toBe('yaml');
  });

  it('should be idempotent on clearSchema', () => {
    const store = useSchemaStore.getState();

    store.clearSchema();
    const firstClear = useSchemaStore.getState();

    store.clearSchema();
    const secondClear = useSchemaStore.getState();

    expect(firstClear).toEqual(secondClear);
  });

  it('should handle full workflow: load - modify - clear', () => {
    useSchemaStore.getState().loadSchema('apiVersion: v1', 'yaml');
    expect(useSchemaStore.getState().code).toBe('apiVersion: v1');

    useSchemaStore.getState().setFormat('json');
    expect(useSchemaStore.getState().format).toBe('json');

    useSchemaStore.getState().setCode('{"apiVersion": "v2"}');
    expect(useSchemaStore.getState().code).toBe('{"apiVersion": "v2"}');

    useSchemaStore.getState().clearSchema();

    const state = useSchemaStore.getState();
    expect(state.code).toBe('');
    expect(state.format).toBe('yaml');
  });

  it('should maintain state isolation between operations', () => {
    const store = useSchemaStore.getState();

    store.setCode('code1');
    store.setFormat('json');

    expect(useSchemaStore.getState().format).toBe('json');
    expect(useSchemaStore.getState().code).toBe('code1');
  });
});
