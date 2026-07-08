import hljs from 'highlight.js';
import type { EditorFormat } from '@/types/editor.types';

export const detectLanguage = (text: string): EditorFormat => {
  if (!text.trim()) {
    return 'yaml';
  }

  const textWithoutComments = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .join('\n');

  if (!textWithoutComments.trim()) {
    return 'yaml';
  }

  const result = hljs.highlightAuto(textWithoutComments, ['json', 'yaml']);

  return result.language === 'json' ? 'json' : 'yaml';
};
