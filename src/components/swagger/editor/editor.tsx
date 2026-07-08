'use client';

import { useEffect, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { useTranslations } from 'next-intl';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorHeader } from '@/components/swagger/editor-header/editor-header';
import { useFormatConverter } from '@/hooks/use-format-converter';
import { useEditorLanguage } from '@/hooks/use-editor';
import { useUserStore } from '@/store/user-store';
import { useSchemaStore } from '@/store/schema-store';
import { getLatestSchema, saveSchema } from '@/app/actions/schema';
import type { EditorFormat } from '@/types/editor.types';
import { getErrorMessage } from '@/utils/get-error-message';

const initialCodeValue = '# Write code here!';
const SAVE_DEBOUNCE_MS = 1000;

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

  const saveWithErrorHandling = useCallback(
    async (value: string, format: EditorFormat) => {
      try {
        const result = await saveSchema({ schema: value, format });

        if (result.error) {
          console.error(t('schemaErrors.saveError'));
          return;
        }

        console.log('Schema auto-saved successfully');
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error, t);
        console.error(errorMessage);
        // TODO: add toast
        console.error(t('schemaErrors.saveError'));
      }
    },
    [t],
  );

  useEffect(() => {
    if (value === initialCodeValue) {
      return;
    }

    const timer = setTimeout(() => {
      void saveWithErrorHandling(value, format);
    }, SAVE_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [value, format, user, loadSchema, saveWithErrorHandling]);

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
