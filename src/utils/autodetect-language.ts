import hljs from 'highlight.js';
import type { EditorFormat } from '@/types/editor.types';

export const detectLanguage = (text: string): EditorFormat => {
  if (!text.trim()) {
    return 'yaml';
  }

  const result = hljs.highlightAuto(text, ['json', 'yaml']);

  return result.language === 'json' ? 'json' : 'yaml';
};
