import { useState } from 'react';
import * as yaml from 'js-yaml';
import type { EditorFormat } from '@/types/editor.types';

type UseFormatConverterReturn = {
  code: string;
  format: EditorFormat;
  setCode: (code: string) => void;
  handleFormatChange: (newFormat: EditorFormat) => void;
  updateFormatWithoutConversion: (newFormat: EditorFormat) => void;
};

export const useFormatConverter = (
  initialCode: string,
  initialFormat: EditorFormat = 'yaml',
): UseFormatConverterReturn => {
  const [code, setCode] = useState<string>(initialCode);
  const [format, setFormat] = useState<EditorFormat>(initialFormat);

  const handleFormatChange = (newFormat: EditorFormat): void => {
    if (newFormat === format) {
      return;
    }

    const cleanedCode = code.trim();

    if (!cleanedCode) {
      setFormat(newFormat);
      return;
    }

    try {
      if (newFormat === 'json') {
        const parsed = yaml.load(cleanedCode);
        if (parsed !== null && typeof parsed === 'object') {
          const jsonString = JSON.stringify(parsed, null, 2);
          setCode(jsonString);
          setFormat(newFormat);
        }
      } else {
        const parsed = yaml.load(cleanedCode);
        if (parsed !== null && typeof parsed === 'object') {
          const yamlString = yaml.dump(parsed, { indent: 2 });
          setCode(yamlString);
          setFormat(newFormat);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateFormatWithoutConversion = (newFormat: EditorFormat): void => {
    setFormat(newFormat);
  };

  return {
    code,
    format,
    setCode,
    handleFormatChange,
    updateFormatWithoutConversion,
  };
};
