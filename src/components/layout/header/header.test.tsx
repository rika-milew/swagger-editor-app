import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import Header from '@/components/layout/header/header';
import { useUserStore } from '@/store/user-store';
import { signOut } from '@/app/actions/auth';
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
    vi.spyOn(console, 'error').mockImplementation(() => {
      vi.fn();
    });
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

  it('calls signOut and clearUser on Sign Out click', async () => {
    const clearUser = vi.fn();
    const user = userEvent.setup();
    vi.mocked(useUserStore).mockImplementation((selector) =>
      selector({ user: mockUser, setUser: vi.fn(), clearUser }),
    );
    vi.mocked(signOut).mockResolvedValue(undefined);

    renderWithProvider(<Header />);
    await user.click(screen.getByText('Sign Out'));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(clearUser).toHaveBeenCalled();
    });
  });

  it('calls clearUser even if signOut fails', async () => {
    const clearUser = vi.fn();
    const user = userEvent.setup();
    vi.mocked(useUserStore).mockImplementation((selector) =>
      selector({ user: mockUser, setUser: vi.fn(), clearUser }),
    );
    vi.mocked(signOut).mockRejectedValue(new Error('Auth error'));

    renderWithProvider(<Header />);
    await user.click(screen.getByText('Sign Out'));

    await waitFor(() => {
      expect(clearUser).toHaveBeenCalled();
    });
  });
});
