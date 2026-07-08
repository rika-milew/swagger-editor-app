import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from './[lang]/page';

const mockT = (key: string) => key;

vi.mock('next-intl', () => ({
  useTranslations: () => mockT,
  useLocale: () => 'en',
}));

describe('Home page layout', () => {
  it('renders with the editor and a viewer', () => {
    render(<Home />);

    const editor = screen.getByTestId('editor-block');
    expect(editor).toBeInTheDocument();

    const viewer = screen.getByTestId('viewer-block');
    expect(viewer).toBeInTheDocument();
  });
});
