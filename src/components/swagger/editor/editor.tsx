'use client';

import { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorHeader } from '@/components/swagger/editor-header/editor-header';
import { useFormatConverter } from '@/hooks/use-format-converter';
import { useEditorLanguage } from '@/hooks/use-editor';
import { useSchemaValidation } from '@/hooks/use-schema-validation';
import { EditorErrors } from '../editor-errors/editor-errors';

type EditorProps = {
  onSchemaChange?: (schema: object | null) => void;
};

const initialCodeValue = '';

export const Editor = ({ onSchemaChange }: EditorProps) => {
  const { value, format, setValue, changeFormat } = useFormatConverter(
    initialCodeValue,
    'yaml',
  );

  const { extensions, handleDocChange } = useEditorLanguage(
    format,
    setValue,
    (newFormat) => changeFormat(newFormat, false),
  );

  const { errors, validSchema } = useSchemaValidation(
    value,
    format,
    (detectedFormat: 'json' | 'yaml') => changeFormat(detectedFormat, false),
  );

  useEffect(() => {
    if (onSchemaChange) {
      onSchemaChange(validSchema);
    }
  }, [validSchema, onSchemaChange]);

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
