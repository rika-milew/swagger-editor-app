'use client';

import { useMemo } from 'react';
import { yaml } from '@codemirror/lang-yaml';
import { json } from '@codemirror/lang-json';
import type { Extension } from '@codemirror/state';
import { customTheme } from '@/components/swagger/editor/editor-theme';
import type { EditorFormat } from '@/types/editor.types';
import { detectLanguage } from '@/utils/autodetect-language';

export type UseEditorLanguageReturn = {
  extensions: Extension[];
  handleDocChange: (value: string) => void;
};

export const useEditorLanguage = (
  format: EditorFormat,
  onChange: (value: string) => void,
  onFormatChange: (format: EditorFormat) => void,
): UseEditorLanguageReturn => {
  const extensions = useMemo<Extension[]>(() => {
    return format === 'json' ? [json(), customTheme] : [yaml(), customTheme];
  }, [format]);

  const handleDocChange = (value: string): void => {
    onChange(value);

    const detectedFormat = detectLanguage(value);

    if (detectedFormat !== format) {
      onFormatChange(detectedFormat);
    }
  };

  return { extensions, handleDocChange };
};
