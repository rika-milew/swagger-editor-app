import { useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

import { useUserStore } from '@/store/user-store';

import { saveSchema } from '@/app/actions/schema';

import type { EditorFormat } from '@/types/editor.types';

import { toaster } from '@/components/toaster/toaster';

const SAVE_DEBOUNCE_MS = 1000;

export const useSchemaAutosave = (
  value: string,
  format: EditorFormat,
  isValid: boolean,
): void => {
  const t = useTranslations('Editor');

  const user = useUserStore((state) => state.user);

  const save = useCallback(
    async (value: string, format: EditorFormat): Promise<void> => {
      if (!user) {
        return;
      }

      try {
        const result = await saveSchema({
          schema: value,
          format,
        });

        if (result.error) {
          console.error(t('schemaErrors.saveError'));
        }
      } catch {
        console.error(t('schemaErrors.saveError'));

        toaster.create({
          type: 'error',
          title: 'Error',
          description: t('schemaErrors.saveError'),
          closable: true,
        });
      }
    },
    [user, t],
  );

  useEffect(() => {
    if (!user || !isValid) {
      return;
    }

    const timer = setTimeout(() => {
      void save(value, format);
    }, SAVE_DEBOUNCE_MS);

    return (): void => {
      clearTimeout(timer);
    };
  }, [user, value, format, isValid, save]);
};
