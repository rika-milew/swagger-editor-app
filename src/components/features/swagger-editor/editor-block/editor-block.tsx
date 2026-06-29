'use client';

import CodeMirror from '@uiw/react-codemirror';
import { yaml } from '@codemirror/lang-yaml';
import { oneDark } from '@codemirror/theme-one-dark';
import { customTheme } from './editor-theme';

export const EditorBlock = () => {
  return (
    <CodeMirror
      value="# Write code here!"
      width="100%"
      theme={oneDark}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: 0,
      }}
      extensions={[yaml(), customTheme]}
    />
  );
};
