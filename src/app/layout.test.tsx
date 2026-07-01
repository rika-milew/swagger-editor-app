import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RootLayout from './layout';

import { vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Inter: () => ({
    variable: '--font-inter',
  }),
  JetBrains_Mono: () => ({
    variable: '--font-jetbrains-mono',
  }),
}));

describe('RootLayout', () => {
  it('renders children', () => {
    const { container } = render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>,
    );
    expect(container.innerHTML).toContain('Test');
  });
});
