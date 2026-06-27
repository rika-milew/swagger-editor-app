import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { TextLink } from './text-link';
import { colors } from '@/theme/colors';
import type { ReactElement } from 'react';
import { typography } from '@/theme/typography';

const renderWithChakra = (ui: ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);
};

describe('TextLink', () => {
  it('renders with required props', () => {
    renderWithChakra(<TextLink href="/test">Test Link</TextLink>);

    const link = screen.getByRole('link', { name: /test link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('renders children correctly', () => {
    renderWithChakra(
      <TextLink href="/test">
        <span>Click</span> <strong>me</strong>
      </TextLink>,
    );

    expect(screen.getByText('Click')).toBeInTheDocument();
    expect(screen.getByText('me')).toBeInTheDocument();
  });

  it('applies default color from theme', () => {
    renderWithChakra(<TextLink href="/test">Test Link</TextLink>);

    const link = screen.getByRole('link');
    expect(link).toHaveStyle(`color: ${colors.brandPrimary}`);
  });

  it('applies custom color when provided', () => {
    const customColor = 'hsl(275, 100%, 50%)';
    renderWithChakra(
      <TextLink href="/test" color={customColor}>
        Test Link
      </TextLink>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveStyle(`color: ${customColor}`);
  });

  it('applies typography styles', () => {
    renderWithChakra(<TextLink href="/test">Test Link</TextLink>);

    const link = screen.getByRole('link');
    expect(link).toHaveStyle('font-size: var(--chakra-font-sizes-sm)');
    expect(link).toHaveStyle(`font-weight: ${typography.textLink.fontWeight}`);
  });

  it('passes through additional props', () => {
    renderWithChakra(
      <TextLink
        href="/test"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Custom link"
      >
        Test Link
      </TextLink>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('aria-label', 'Custom link');
  });
});
