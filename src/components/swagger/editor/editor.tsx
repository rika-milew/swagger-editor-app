'use client';

import { useEffect } from 'react';
import { useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { useTranslations } from 'next-intl';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorHeader } from '@/components/swagger/editor-header/editor-header';
import { useFormatConverter } from '@/hooks/use-format-converter';
import { useEditorLanguage } from '@/hooks/use-editor';
import { useUserStore } from '@/store/user-store';
import { useSchemaStore } from '@/store/schema-store';
import { getSchema } from '@/app/actions/schema';
import { useSchemaAutosave } from '@/hooks/use-schema-autosave';
import { toaster } from '@/components/toaster/toaster';
import { useSchemaValidation } from '@/hooks/use-schema-validation';
import { EditorErrors } from '../editor-errors/editor-errors';

const initialCodeValue = '';

export const Editor = () => {
  const t = useTranslations('Editor');

  const { value, format, setValue, changeFormat } = useFormatConverter(
    initialCodeValue,
    'yaml',
  );

  const user = useUserStore((state) => state.user);
  const { loadSchema, clearSchema } = useSchemaStore();

  const { extensions, handleDocChange } = useEditorLanguage(
    format,
    setValue,
    (newFormat) => changeFormat(newFormat, false),
  );

  const { validSchema, errors } = useSchemaValidation(value, format);

  const isSchemaLoaded = useRef(false);

  useEffect(() => {
    if (!user) {
      setValue(initialCodeValue);
      changeFormat('yaml', false);
      clearSchema();
      isSchemaLoaded.current = false;
    }
  }, [user]);

  useEffect(() => {
    if (!user || isSchemaLoaded.current) {
      return;
    }

    const fetchSchema = async (): Promise<void> => {
      try {
        const schema = await getSchema();

        if (schema) {
          setValue(schema.schema);
          changeFormat(schema.format, false);
          loadSchema(schema.schema, schema.format);
          isSchemaLoaded.current = true;
        }
      } catch {
        console.error(t('schemaErrors.loadError'));

        toaster.create({
          type: 'error',
          title: 'Error',
          description: t('schemaErrors.loadError'),
          closable: true,
        });
      }
    };

    void fetchSchema();
  }, [user, setValue, changeFormat, t, loadSchema]);

  useEffect(() => {
    if (!validSchema) {
      clearSchema();
      return;
    }

    loadSchema(value, format);
  }, [validSchema, value, format, loadSchema, clearSchema]);

  useSchemaAutosave(value, format, Boolean(validSchema));

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

      <EditorErrors errors={errors} />
    </>
  );
};
