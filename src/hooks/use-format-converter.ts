import { useState, useRef, useEffect } from 'react';
import * as yaml from 'js-yaml';
import { toaster } from '@/components/ui/toaster';
import type { EditorFormat } from '@/types/editor.types';

type UseFormatConverterReturn = {
  value: string;
  format: EditorFormat;
  setValue: (value: string) => void;
  changeFormat: (newFormat: EditorFormat, shouldConvert?: boolean) => void;
};

export const useFormatConverter = (
  initialValue: string,
  initialFormat: EditorFormat = 'yaml',
): UseFormatConverterReturn => {
  const [value, setValue] = useState<string>(initialValue);
  const [format, setFormat] = useState<EditorFormat>(initialFormat);
  const toastIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (toastIdRef.current) {
      toaster.dismiss(toastIdRef.current);
      toastIdRef.current = undefined;
    }
  }, [value]);

  const changeFormat = (
    newFormat: EditorFormat,
    shouldConvert = true,
  ): void => {
    if (newFormat === format) {
      return;
    }

    if (!shouldConvert) {
      setFormat(newFormat);
      return;
    }

    const cleanedCode = value.trim();

    if (!cleanedCode) {
      setFormat(newFormat);
      return;
    }

    try {
      const parsed = yaml.load(cleanedCode);
      if (parsed !== null && parsed !== undefined) {
        if (newFormat === 'json') {
          const jsonString = JSON.stringify(parsed, null, 2);
          setValue(jsonString);
        } else {
          const yamlString = yaml.dump(parsed, { indent: 2 });
          setValue(yamlString);
        }
        setFormat(newFormat);
      }
    } catch (error) {
      if (toastIdRef.current) {
        toaster.dismiss(toastIdRef.current);
      }

      const message =
        error instanceof Error ? error.message : 'Invalid syntax format';

      const id = toaster.create({
        title: 'Conversion Error',
        description: message,
        type: 'error',
        duration: Infinity,
      });

      toastIdRef.current = id;
    }
  };

  return {
    value,
    format,
    setValue,
    changeFormat,
  };
};
