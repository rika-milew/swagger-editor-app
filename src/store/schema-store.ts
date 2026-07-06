import { create } from 'zustand';
import type { EditorFormat } from '@/types/editor.types';

type SchemaStore = {
  schemaCode: string;
  schemaFormat: EditorFormat;
  setCode: (code: string) => void;
  setFormat: (format: EditorFormat) => void;
  loadSchema: (code: string, format: EditorFormat) => void;
  clearSchema: () => void;
};

export const useSchemaStore = create<SchemaStore>()((set) => ({
  schemaCode: '',
  schemaFormat: 'yaml',

  setCode: (schemaCode): void => set({ schemaCode }),
  setFormat: (schemaFormat): void => set({ schemaFormat }),
  loadSchema: (schemaCode, schemaFormat): void =>
    set({ schemaCode, schemaFormat }),
  clearSchema: (): void => set({ schemaCode: '', schemaFormat: 'yaml' }),
}));
