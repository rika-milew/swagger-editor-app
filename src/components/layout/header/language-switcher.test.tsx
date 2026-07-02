import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '@/test-utils/render-with-providers';

import LanguageSwitcher from './language-switcher';

const replaceMock = vi.fn();

const translations: Record<string, string> = {
  languageOne: 'EN',
  languageTwo: 'RU',
};

function translateButtons(key: string): string {
  return translations[key] ?? key;
}

function identityTranslation(key: string): string {
  return key;
}

function useTranslationsMock(namespace: string) {
  return namespace === 'Buttons' ? translateButtons : identityTranslation;
}

function useLocaleMock() {
  return 'en';
}

function useRouterMock() {
  return {
    replace: replaceMock,
  };
}

function usePathnameMock() {
  return '/en';
}

vi.mock('next/navigation', () => ({
  useRouter: useRouterMock,
  usePathname: usePathnameMock,
}));

vi.mock('next-intl', () => ({
  useLocale: useLocaleMock,
  useTranslations: useTranslationsMock,
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    replaceMock.mockClear();
  });

  it('renders language switcher', () => {
    renderWithProviders(<LanguageSwitcher />);

    const button = screen.getByRole('button', {
      name: /language-switcher/i,
    });

    expect(button).toBeInTheDocument();
  });

  it('calls router.replace when language changes', async () => {
    const user = userEvent.setup();

    renderWithProviders(<LanguageSwitcher />);

    const button = screen.getByRole('button', {
      name: /language-switcher/i,
    });

    await user.click(button);

    expect(replaceMock).toHaveBeenCalledTimes(1);
    expect(replaceMock).toHaveBeenCalledWith('/ru');
  });
});
