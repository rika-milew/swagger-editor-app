'use client';

import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorHeader } from '@/components/swagger/editor-header/editor-header';
import { useFormatConverter } from '@/hooks/use-format-converter';
import { useEditorLanguage } from '@/hooks/use-editor';

const initialCodeValue = '# Write code here!';

export const Editor = () => {
  const {
    code,
    format,
    setCode,
    handleFormatChange,
    updateFormatWithoutConversion,
  } = useFormatConverter(initialCodeValue, 'yaml');

  const { extensions, handleDocChange } = useEditorLanguage(
    format,
    setCode,
    updateFormatWithoutConversion,
  );

  return (
    <>
      <EditorHeader format={format} onFormatChange={handleFormatChange} />

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
