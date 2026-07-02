import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signIn, signUp, signOut } from '@/app/actions/auth';
import { getErrorMessage } from '@/utils/get-error-message';

const { mockSignInWithPassword, mockSignUp, mockSignOutMethod, mockRedirect } =
  vi.hoisted(() => ({
    mockSignInWithPassword: vi.fn(),
    mockSignUp: vi.fn(),
    mockSignOutMethod: vi.fn(),
    mockRedirect: vi.fn(),
  }));

vi.mock('@/lib/database/server', () => ({
  createServerClient: vi.fn(() =>
    Promise.resolve({
      auth: {
        signInWithPassword: mockSignInWithPassword,
        signUp: mockSignUp,
        signOut: mockSignOutMethod,
      },
    }),
  ),
}));

vi.mock('next/navigation', () => ({
  redirect: mockRedirect,
}));

vi.mock('@/utils/get-error-message', () => ({
  getErrorMessage: vi.fn(),
}));

describe('signIn', () => {
  it('should return validation error for invalid data', async () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
    vi.mocked(getErrorMessage).mockReturnValue('Validation error');

    const result = await signIn({ email: 'invalid', password: '' });

    expect(result).toEqual({ error: 'Validation error' });
  });

  it('should return default validation message', async () => {
    vi.mocked(getErrorMessage).mockReturnValue(undefined);

    const result = await signIn({ email: 'invalid', password: '' });

    expect(result).toEqual({ error: 'Validation failed' });
  });

  it('should return auth error from Supabase', async () => {
    mockSignInWithPassword.mockResolvedValue({
      error: new Error('Invalid credentials'),
    });
    vi.mocked(getErrorMessage).mockReturnValue('Invalid credentials');

    const result = await signIn({
      email: 'test@example.com',
      password: 'test123!',
    });

    expect(result).toEqual({ error: 'Invalid credentials' });
  });

  it('should return default auth error message', async () => {
    mockSignInWithPassword.mockResolvedValue({
      error: new Error('Some error'),
    });
    vi.mocked(getErrorMessage).mockReturnValue(undefined);

    const result = await signIn({
      email: 'test@example.com',
      password: 'test123!',
    });

    expect(result).toEqual({ error: 'Authentication failed' });
  });

  it('should handle unexpected errors', async () => {
    mockSignInWithPassword.mockRejectedValue(new Error('Network error'));
    vi.mocked(getErrorMessage).mockReturnValue('Network error');

    const result = await signIn({
      email: 'test@example.com',
      password: 'test123!',
    });

    expect(result).toEqual({ error: 'Network error' });
  });

  it('should return default unexpected error message', async () => {
    mockSignInWithPassword.mockRejectedValue(new Error('Some error'));
    vi.mocked(getErrorMessage).mockReturnValue(undefined);

    const result = await signIn({
      email: 'test@example.com',
      password: 'test123!',
    });

    expect(result).toEqual({
      error: 'An unexpected authentication error occurred',
    });
  });

  it('should redirect on success', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: null });

    await signIn({ email: 'test@example.com', password: 'test123!' });

    expect(mockRedirect).toHaveBeenCalledWith('/');
  });
});

describe('signUp', () => {
  it('should return validation error for invalid data', async () => {
    vi.mocked(getErrorMessage).mockReturnValue('Validation error');

    const result = await signUp({
      email: 'invalid',
      password: '',
      confirmPassword: '',
    });

    expect(result).toEqual({ error: 'Validation error' });
  });

  it('should return auth error from Supabase', async () => {
    mockSignUp.mockResolvedValue({ error: new Error('Email exists') });
    vi.mocked(getErrorMessage).mockReturnValue('Email exists');

    const result = await signUp({
      email: 'test@test.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    expect(result).toEqual({ error: 'Email exists' });
  });

  it('should handle unexpected errors', async () => {
    mockSignUp.mockRejectedValue(new Error('Network error'));
    vi.mocked(getErrorMessage).mockReturnValue('Network error');

    const result = await signUp({
      email: 'test@test.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    expect(result).toEqual({ error: 'Network error' });
  });

  it('should return error from Supabase', async () => {
    mockSignUp.mockResolvedValue({ error: new Error('Email exists') });
    vi.mocked(getErrorMessage).mockReturnValue('Email exists');

    const result = await signUp({
      email: 'test@example.com',
      password: 'test1231!',
      confirmPassword: 'test1231!',
    });

    expect(result).toEqual({ error: 'Email exists' });
  });

  it('should return default error when Supabase error has no message', async () => {
    mockSignUp.mockResolvedValue({ error: new Error('Some error') });
    vi.mocked(getErrorMessage).mockReturnValue(undefined);

    const result = await signUp({
      email: 'test@example.com',
      password: 'test123!',
      confirmPassword: '',
    });

    expect(result).toEqual({ error: 'Validation failed' });
  });

  it('should return default error when unexpected error has no message', async () => {
    mockSignUp.mockRejectedValue(new Error('Some error'));
    vi.mocked(getErrorMessage).mockReturnValue(undefined);

    const result = await signUp({
      email: 'test@example.com',
      password: 'test123!',
      confirmPassword: '',
    });

    expect(result).toEqual({
      error: 'Validation failed',
    });
  });

  it('should return default unexpected error message', async () => {
    mockSignUp.mockRejectedValue(new Error('Some error'));
    vi.mocked(getErrorMessage).mockReturnValue(undefined);

    const result = await signUp({
      email: 'test@example.com',
      password: 'test123!',
      confirmPassword: 'test123!',
    });

    expect(result).toEqual({
      error: 'An unexpected registration error occurred',
    });
  });

  it('should redirect on success', async () => {
    mockSignUp.mockResolvedValue({ error: null });

    await signUp({
      email: 'test@example.com',
      password: 'test123!',
      confirmPassword: 'test123!',
    });

    expect(mockRedirect).toHaveBeenCalledWith('/');
  });
});

describe('signOut', () => {
  it('should sign out successfully', async () => {
    mockSignOutMethod.mockResolvedValue({ error: null });

    await signOut();

    expect(mockRedirect).toHaveBeenCalledWith('/');
  });

  it('should handle sign out error', async () => {
    const consoleSpy = vi.spyOn(console, 'error');
    mockSignOutMethod.mockResolvedValue({
      error: new Error('Sign out error'),
    });
    vi.mocked(getErrorMessage).mockReturnValue('Sign out error');

    await signOut();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Sign out error:',
      'Sign out error',
    );
    expect(mockRedirect).toHaveBeenCalledWith('/');
    consoleSpy.mockRestore();
  });

  it('should handle unexpected errors', async () => {
    const consoleSpy = vi.spyOn(console, 'error');
    mockSignOutMethod.mockRejectedValue(new Error('Network error'));
    vi.mocked(getErrorMessage).mockReturnValue('Network error');

    await signOut();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Sign out failed:',
      'Network error',
    );
    expect(mockRedirect).toHaveBeenCalledWith('/');
    consoleSpy.mockRestore();
  });
});
