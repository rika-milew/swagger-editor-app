'use client';

import { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import type { EditorFormat } from '@/types/editor.types';
import { useEditorLanguage } from '@/hooks/use-editor';
import { useUserStore } from '@/store/user-store';
import { useSchemaStore } from '@/store/schema-store';
import { getLatestSchema } from '@/app/actions/schema';

type EditorProps = {
  code: string;
  format: EditorFormat;
  onChange: (value: string) => void;
  onFormatChange: (format: EditorFormat) => void;
};

export const Editor = ({
  code,
  format,
  onChange,
  onFormatChange,
}: EditorProps) => {
  const user = useUserStore((state) => state.user);
  const { loadSchema } = useSchemaStore();

  const { extensions, handleDocChange } = useEditorLanguage(
    format,
    onChange,
    onFormatChange,
  );

  useEffect(() => {
    if (user) {
      const fetchSchema = async () => {
        try {
          const schema = await getLatestSchema();
          if (schema) {
            loadSchema(schema.schema, schema.format);
            onChange(schema.schema);
            onFormatChange(schema.format);
          }
        } catch (error: unknown) {
          void error;
        }
      };
      void fetchSchema();
    }
  }, [user, loadSchema, onChange, onFormatChange]);

  return (
    <CodeMirror
      value={code}
      width="100%"
      theme={oneDark}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: 0,
      }}
      extensions={extensions}
      onChange={handleDocChange}
    />
  );
};
