import { useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useUserStore } from '@/store/user-store';
import { useSchemaStore } from '@/store/schema-store';
import { saveSchema } from '@/app/actions/schema';
import type { EditorFormat } from '@/types/editor.types';
import { toaster } from '@/components/toaster/toaster';

const SAVE_DEBOUNCE_MS = 1000;
const INITIAL_CODE = '# Write code here!';

export const useSchemaAutosave = (
  value: string,
  format: EditorFormat,
): void => {
  const t = useTranslations('Editor');
  const user = useUserStore((state) => state.user);
  const { loadSchema } = useSchemaStore();

  const save = useCallback(
    async (value: string, format: EditorFormat) => {
      loadSchema(value, format);

      if (!user) {
        return;
      }

      try {
        const result = await saveSchema({ schema: value, format });
        if (result.error) {
          console.error(t('schemaErrors.saveError'));
          return;
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
    [t, user, loadSchema],
  );

  useEffect(() => {
    if (value === INITIAL_CODE) {
      return;
    }

    const timer = setTimeout(() => {
      void save(value, format);
    }, SAVE_DEBOUNCE_MS);

    return (): void => {
      clearTimeout(timer);
    };
  }, [value, format, save]);
};
