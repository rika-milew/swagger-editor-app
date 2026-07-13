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

const useLocaleMock = vi.fn(() => 'en');
const usePathnameMock = vi.fn(() => '/en');

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  usePathname: () => usePathnameMock(),
}));

vi.mock('next-intl', () => ({
  useLocale: () => useLocaleMock(),
  useTranslations: (namespace: string) =>
    namespace === 'Buttons' ? translateButtons : identityTranslation,
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    replaceMock.mockClear();
    useLocaleMock.mockReturnValue('en');
    usePathnameMock.mockReturnValue('/en');
  });

  it('renders language switcher', () => {
    renderWithProviders(<LanguageSwitcher />);

    expect(
      screen.getByRole('button', {
        name: /language-switcher/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders both language labels', () => {
    renderWithProviders(<LanguageSwitcher />);

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('RU')).toBeInTheDocument();
  });

  it('calls router.replace when switching from en to ru', async () => {
    const user = userEvent.setup();

    renderWithProviders(<LanguageSwitcher />);

    await user.click(
      screen.getByRole('button', {
        name: /language-switcher/i,
      }),
    );

    expect(replaceMock).toHaveBeenCalledTimes(1);
    expect(replaceMock).toHaveBeenCalledWith('/ru');
  });

  it('calls router.replace when switching from ru to en', async () => {
    const user = userEvent.setup();

    useLocaleMock.mockReturnValue('ru');
    usePathnameMock.mockReturnValue('/ru');

    renderWithProviders(<LanguageSwitcher />);

    await user.click(
      screen.getByRole('button', {
        name: /language-switcher/i,
      }),
    );

    expect(replaceMock).toHaveBeenCalledTimes(1);
    expect(replaceMock).toHaveBeenCalledWith('/en');
  });

  it('preserves nested pathname when switching language', async () => {
    const user = userEvent.setup();

    useLocaleMock.mockReturnValue('en');
    usePathnameMock.mockReturnValue('/en/products/details');

    renderWithProviders(<LanguageSwitcher />);

    await user.click(
      screen.getByRole('button', {
        name: /language-switcher/i,
      }),
    );

    expect(replaceMock).toHaveBeenCalledWith('/ru/products/details');
  });
});
