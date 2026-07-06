import { create } from 'zustand';
import type { EditorFormat } from '@/types/editor.types';

type SchemaStore = {
  code: string;
  format: EditorFormat;
  setCode: (code: string) => void;
  setFormat: (format: EditorFormat) => void;
  loadSchema: (code: string, format: EditorFormat) => void;
};

export const useSchemaStore = create<SchemaStore>()((set) => ({
  code: '',
  format: 'yaml',

  setCode: (code): void => set({ code }),
  setFormat: (format): void => set({ format }),
  loadSchema: (code, format): void => set({ code, format }),
}));
