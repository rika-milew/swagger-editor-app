'use client';

import { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { useTranslations } from 'next-intl';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorHeader } from '@/components/swagger/editor-header/editor-header';
import { useFormatConverter } from '@/hooks/use-format-converter';
import { useEditorLanguage } from '@/hooks/use-editor';
import { useUserStore } from '@/store/user-store';
import { useSchemaStore } from '@/store/schema-store';
import { getLatestSchema } from '@/app/actions/schema';
import { useSchemaAutosave } from '@/hooks/use-schema-autosave';

const initialCodeValue = '# Write code here!';

export const Editor = () => {
  const t = useTranslations('Editor');

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
    if (!user) {
      setValue(initialCodeValue);
      changeFormat('yaml', false);
      return;
    }

    const fetchSchema = async () => {
      try {
        const schema = await getLatestSchema();
        if (schema) {
          setValue(schema.schema);
          changeFormat(schema.format, false);
          loadSchema(schema.schema, schema.format);
        }
      } catch {
        console.error(t('schemaErrors.loadError'));
        // TODO: add toast
      }
    };

    void fetchSchema();
  }, [user]);

  useSchemaAutosave(value, format);

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
