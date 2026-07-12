import { create } from 'zustand';
import type { EditorFormat } from '@/types/editor.types';

type SchemaStore = {
  code: string;
  format: EditorFormat;
  baseUrl: string;
  setCode: (code: string) => void;
  setFormat: (format: EditorFormat) => void;
  setBaseUrl: (url: string) => void;
  loadSchema: (code: string, format: EditorFormat) => void;
  clearSchema: () => void;
};

export const useSchemaStore = create<SchemaStore>()((set) => ({
  code: '',
  format: 'yaml',
  baseUrl: '',

  setCode: (code): void => set({ code }),
  setFormat: (format): void => set({ format }),
  setBaseUrl: (newUrl: string): void => set({ baseUrl: newUrl }),
  loadSchema: (code, format): void => set({ code, format }),
  clearSchema: (): void => set({ code: '', format: 'yaml' }),
}));
