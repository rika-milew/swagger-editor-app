'use client';

import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import type { EditorFormat } from '@/types/editor.types';
import { useEditorLanguage } from '@/hooks/use-editor';
import { EditorHeader } from '@/components/swagger/editor-header/editor-header';

export const Editor = () => {
  const [code, setCode] = useState<string>('# Write code here!');
  const [format, setFormat] = useState<EditorFormat>('yaml');

  const { extensions, handleDocChange } = useEditorLanguage(
    format,
    setCode,
    setFormat,
  );

  return (
    <>
      <EditorHeader format={format} onFormatChange={setFormat} />

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
    </>
  );
};
