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

vi.mock('@/lib/auth/get-session', () => ({
  getSession: vi.fn(),
}));

describe('RootLayout', () => {
  it('renders children', () => {
    const layout = RootLayout({ children: <div>Test</div> });
    const { container } = render(layout);
    expect(container.innerHTML).toContain('Test');
  });
});
