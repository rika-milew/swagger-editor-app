'use client';

import { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorHeader } from '@/components/swagger/editor-header/editor-header';
import { useFormatConverter } from '@/hooks/use-format-converter';
import { useEditorLanguage } from '@/hooks/use-editor';
import { useUserStore } from '@/store/user-store';
import { useSchemaStore } from '@/store/schema-store';
import { getLatestSchema } from '@/app/actions/schema';
import { saveSchema } from '@/app/actions/schema';

const initialCodeValue = '# Write code here!';
const SAVE_DEBOUNCE_MS = 2000;

export const Editor = () => {
  const { value, format, setValue, changeFormat } = useFormatConverter(
    initialCodeValue,
    'yaml',
  );

  const user = useUserStore((state) => state.user);
  const { loadSchema } = useSchemaStore();

  const { extensions, handleDocChange } = useEditorLanguage(
    format,
    setValue,
    (newFormat) => changeFormat(newFormat, false),
  );

  useEffect(() => {
    if (user) {
      const fetchSchema = async () => {
        try {
          const schema = await getLatestSchema();
          if (schema) {
            setValue(schema.schema);
            changeFormat(schema.format, false);
            loadSchema(schema.schema, schema.format);
          }
        } catch (error: unknown) {
          void error;
        }
      };
      void fetchSchema();
    }
  }, [user]);

  useEffect(() => {
    if (user && value !== initialCodeValue) {
      const timer = setTimeout(() => {
        loadSchema(value, format);
        void saveSchema({ schema: value, format });
      }, SAVE_DEBOUNCE_MS);

      return () => clearTimeout(timer);
    }
  }, [value, format, user, loadSchema]);

  return (
    <>
      <EditorHeader format={format} onFormatChange={changeFormat} />

      <CodeMirror
        value={value}
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
    </>
  );
};
