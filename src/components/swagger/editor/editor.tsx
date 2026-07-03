'use client';

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import type { EditorFormat } from '@/types/editor.types';
import { useEditorLanguage } from '@/hooks/useEditor';

type EditorProps = {
  code: string;
  format: EditorFormat;
  onChange: (value: string) => void;
  onFormatChange: (format: EditorFormat) => void;
};

export const Editor: React.FC<EditorProps> = ({
  code,
  format,
  onChange,
  onFormatChange,
}) => {
  const { extensions, handleDocChange } = useEditorLanguage(
    format,
    onChange,
    onFormatChange,
  );

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
