import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signIn, signUp, signOut } from '@/app/actions/auth';

const {
  mockSignInWithPassword,
  mockSignUp,
  mockSignOutMethod,
  mockRedirect,
  mockGetDatabaseErrorKey,
} = vi.hoisted(() => ({
  mockSignInWithPassword: vi.fn(),
  mockSignUp: vi.fn(),
  mockSignOutMethod: vi.fn(),
  mockRedirect: vi.fn(),
  mockGetDatabaseErrorKey: vi.fn(),
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

vi.mock('@/lib/database/database-errors', () => ({
  getDatabaseErrorKey: mockGetDatabaseErrorKey,
}));

vi.mock('@/utils/get-locale-server', () => ({
  getLocaleFromHeaders: vi.fn(() => Promise.resolve('en')),
}));

describe('signIn', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return validation error for invalid data', async () => {
    const result = await signIn({ email: 'invalid', password: '' });

    expect(result).toEqual({ error: 'validationErrors.default' });
  });

  it('should return error key from database error', async () => {
    mockGetDatabaseErrorKey.mockReturnValue('auth/invalid-credentials');
    mockSignInWithPassword.mockResolvedValue({
      error: new Error('Invalid credentials'),
    });

    const result = await signIn({
      email: 'test@example.com',
      password: 'test123!',
    });

    expect(result).toEqual({ error: 'auth/invalid-credentials' });
  });

  it('should return default validation message', async () => {
    const result = await signIn({ email: 'invalid', password: '' });

    expect(result).toEqual({ error: 'validationErrors.default' });
  });

  it('should return auth error from Supabase', async () => {
    mockSignInWithPassword.mockResolvedValue({
      error: new Error('Invalid credentials'),
    });

    const result = await signIn({
      email: 'test@example.com',
      password: 'test123!',
    });

    expect(result).toEqual({ error: 'auth/invalid-credentials' });
  });

  it('should handle unexpected errors', async () => {
    mockSignInWithPassword.mockRejectedValue(new Error('Network error'));

    const result = await signIn({
      email: 'test@example.com',
      password: 'test123!',
    });

    expect(result).toEqual({ error: 'serverErrors.default' });
  });

  it('should return default unexpected error message', async () => {
    mockSignInWithPassword.mockRejectedValue(new Error('Some error'));

    const result = await signIn({
      email: 'test@example.com',
      password: 'test123!',
    });

    expect(result).toEqual({
      error: 'serverErrors.default',
    });
  });

  it('should redirect on success', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: null });

    await signIn({ email: 'test@example.com', password: 'test123!' });

    expect(mockRedirect).toHaveBeenCalledWith('/en/');
  });
});

describe('signUp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return validation error for invalid data', async () => {
    const result = await signUp({
      email: 'invalid',
      password: '',
      confirmPassword: '',
    });

    expect(result).toEqual({ error: 'validationErrors.default' });
  });

  it('should return database error key from Supabase', async () => {
    mockGetDatabaseErrorKey.mockReturnValue('auth/email-already-exists');
    mockSignUp.mockResolvedValue({
      error: new Error('Email exists'),
    });

    const result = await signUp({
      email: 'test@example.com',
      password: 'test123!',
      confirmPassword: 'test123!',
    });

    expect(result).toEqual({ error: 'auth/email-already-exists' });
    expect(mockGetDatabaseErrorKey).toHaveBeenCalledWith(
      new Error('Email exists'),
    );
  });

  it('should handle unexpected errors', async () => {
    mockSignUp.mockRejectedValue(new Error('Network error'));

    const result = await signUp({
      email: 'test@test.com',
      password: 'password123!',
      confirmPassword: 'password123!',
    });

    expect(result).toEqual({ error: 'serverErrors.default' });
  });

  it('should redirect on success', async () => {
    mockSignUp.mockResolvedValue({ error: null });

    await signUp({
      email: 'test@example.com',
      password: 'test123!',
      confirmPassword: 'test123!',
    });

    expect(mockRedirect).toHaveBeenCalledWith('/en/');
  });
});

describe('signOut', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should sign out successfully', async () => {
    mockSignOutMethod.mockResolvedValue({ error: null });

    await signOut();

    expect(mockRedirect).toHaveBeenCalledWith('/en/');
  });

  it('should handle sign out error', async () => {
    const consoleSpy = vi.spyOn(console, 'error');
    mockGetDatabaseErrorKey.mockReturnValue('serverErrors.sessionExpired');
    mockSignOutMethod.mockResolvedValue({
      error: new Error('Sign out error'),
    });

    await signOut();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Sign out error:',
      'serverErrors.sessionExpired',
    );
    expect(mockRedirect).toHaveBeenCalledWith('/en/');
    consoleSpy.mockRestore();
  });

  it('should handle unexpected errors', async () => {
    const consoleSpy = vi.spyOn(console, 'error');
    mockSignOutMethod.mockRejectedValue(new Error('Network error'));

    await signOut();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Sign out failed:',
      'serverErrors.default',
    );
    expect(mockRedirect).toHaveBeenCalledWith('/en/');
    consoleSpy.mockRestore();
  });

  it('should use provided locale', async () => {
    mockSignOutMethod.mockResolvedValue({ error: null });

    await signOut('ru');

    expect(mockRedirect).toHaveBeenCalledWith('/ru/');
  });

  it('should use default locale when none provided', async () => {
    mockSignOutMethod.mockResolvedValue({ error: null });

    await signOut();

    expect(mockRedirect).toHaveBeenCalledWith('/en/');
  });
});
