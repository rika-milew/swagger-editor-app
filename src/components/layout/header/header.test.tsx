import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import Header from '@/components/layout/header/header';
import { useUserStore } from '@/store/user-store';
import type { AppUser } from '@/types/auth.types';
import type { ReactNode, ReactElement } from 'react';

vi.mock('@/store/user-store', () => ({
  useUserStore: vi.fn(),
}));

vi.mock('@/app/actions/auth', () => ({
  signOut: vi.fn(),
}));

const translations: Record<string, string> = {
  history: 'History',
  login: 'Sign In',
  register: 'Sign Up',
  logout: 'Sign Out',
};

const mockUseTranslations = (key: string) => translations[key];

vi.mock('next-intl', () => ({
  useTranslations: () => mockUseTranslations,
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/components/layout/header/navigation', () => ({
  default: () => <nav>Navigation</nav>,
}));

vi.mock('@/components/layout/header/language-switcher', () => ({
  default: () => <button>EN / RU</button>,
}));

vi.mock('@/components/logo/logo', () => ({
  default: () => <div>Logo</div>,
}));

function renderWithProvider(ui: ReactElement) {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);
}

const mockUser: AppUser = {
  id: '1',
  email: 'test@example.com',
  created_at: '2026-01-01',
};

function mockUnauthenticated() {
  vi.mocked(useUserStore).mockImplementation((selector) =>
    selector({ user: null, setUser: vi.fn(), clearUser: vi.fn() }),
  );
}

function mockAuthenticated() {
  vi.mocked(useUserStore).mockImplementation((selector) =>
    selector({ user: mockUser, setUser: vi.fn(), clearUser: vi.fn() }),
  );
}

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows Sign In and Sign Up for unauthenticated user', () => {
    mockUnauthenticated();
    renderWithProvider(<Header />);
    expect(screen.getByText('Sign In')).toBeDefined();
    expect(screen.getByText('Sign Up')).toBeDefined();
    expect(screen.queryByText('History')).toBeNull();
    expect(screen.queryByText('Sign Out')).toBeNull();
  });

  it('has correct links for unauthenticated user', () => {
    mockUnauthenticated();
    renderWithProvider(<Header />);
    expect(screen.getByText('Sign In').closest('a')?.getAttribute('href')).toBe(
      '/sign-in',
    );
    expect(screen.getByText('Sign Up').closest('a')?.getAttribute('href')).toBe(
      '/sign-up',
    );
  });

  it('shows History and Sign Out for authenticated user', () => {
    mockAuthenticated();
    renderWithProvider(<Header />);
    expect(screen.getByText('History')).toBeDefined();
    expect(screen.getByText('Sign Out')).toBeDefined();
    expect(screen.queryByText('Sign In')).toBeNull();
    expect(screen.queryByText('Sign Up')).toBeNull();
  });

  it('has correct link for History', () => {
    mockAuthenticated();
    renderWithProvider(<Header />);
    expect(screen.getByText('History').closest('a')?.getAttribute('href')).toBe(
      '/history',
    );
  });
});
