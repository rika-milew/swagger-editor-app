'use client';

import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import type { EditorFormat } from '@/types/editor.types';
import { useEditorLanguage } from '@/hooks/use-editor';

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
