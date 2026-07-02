import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import Header from './header';
import { useUserStore } from '@/store/user-store';
import type { ReactNode, ReactElement } from 'react';
import { signOut } from '@/app/actions/auth';
import type { AppUser } from '@/types/auth.types';

vi.mock('@/store/user-store', () => ({
  useUserStore: vi.fn(),
}));

vi.mock('@/app/actions/auth', () => ({
  signOut: vi.fn(),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/components/header/navigation', () => ({
  default: () => <nav>Navigation</nav>,
}));

vi.mock('@/components/logo/logo', () => ({
  default: () => <div>Logo</div>,
}));

function renderWithProvider(ui: ReactElement) {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);
}

describe('Header', () => {
  const mockClearUser = vi.fn();
  const mockSetUser = vi.fn();

  const mockUser: AppUser = {
    id: '1',
    email: 'test@example.com',
    created_at: '2026-01-01',
  };

  it('should render correctly when user is null', () => {
    vi.mocked(useUserStore).mockImplementation((selector) => {
      return selector({
        user: null,
        clearUser: mockClearUser,
        setUser: mockSetUser,
      });
    });

    renderWithProvider(<Header />);
    expect(screen.getByText('Sign In')).toBeDefined();
    expect(screen.getByText('Sign Up')).toBeDefined();
  });

  it('should execute signOut when Sign Out button is clicked', async () => {
    vi.mocked(signOut).mockResolvedValue(undefined);

    vi.mocked(useUserStore).mockImplementation((selector) => {
      return selector({
        user: mockUser,
        clearUser: mockClearUser,
        setUser: mockSetUser,
      });
    });

    renderWithProvider(<Header />);
    fireEvent.click(screen.getByText('Sign Out'));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle signOut rejection', async () => {
    vi.mocked(signOut).mockRejectedValue(new Error('Auth error'));

    vi.mocked(useUserStore).mockImplementation((selector) => {
      return selector({
        user: mockUser,
        clearUser: mockClearUser,
        setUser: mockSetUser,
      });
    });

    renderWithProvider(<Header />);
    fireEvent.click(screen.getByText('Sign Out'));

    await waitFor(() => {
      expect(mockClearUser).toHaveBeenCalled();
    });
  });
});
