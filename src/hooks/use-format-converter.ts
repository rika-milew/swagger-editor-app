import { useState, useRef, useEffect } from 'react';
import * as yaml from 'js-yaml';
import { toaster } from '@/components/toaster/toaster';
import type { EditorFormat } from '@/types/editor.types';

type UseFormatConverterReturn = {
  value: string;
  format: EditorFormat;
  setValue: (value: string) => void;
  changeFormat: (newFormat: EditorFormat, shouldConvert?: boolean) => void;
};

const getConvertedValue = (
  val: string,
  targetFormat: EditorFormat,
): string | undefined => {
  const parsed = yaml.load(val);
  if (parsed === null || parsed === undefined) {
    return undefined;
  }
  return targetFormat === 'json'
    ? JSON.stringify(parsed, null, 2)
    : yaml.dump(parsed, { indent: 2 });
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
      const converted = getConvertedValue(cleanedCode, newFormat);
      if (converted !== undefined) {
        setValue(converted);
        setFormat(newFormat);
      }
    } catch (error) {
      if (toastIdRef.current) {
        toaster.dismiss(toastIdRef.current);
      }

      const message =
        error instanceof Error ? error.message : 'Invalid syntax format';

      toastIdRef.current = toaster.create({
        title: 'Conversion Error',
        description: message,
        type: 'error',
        duration: Infinity,
      });
    }
  };

  return {
    value,
    format,
    setValue,
    changeFormat,
  };
};
