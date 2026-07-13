import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';

import type { UseSchemaValidationReturn } from '@/types/schema-validation.types';
import type { UserStore } from '@/store/user-store';
import type { AppUser } from '@/types/auth.types';

import { Editor } from './editor';
import { useUserStore } from '@/store/user-store';
import { renderWithProviders } from '@/test-utils/render-with-providers';

const { mockLoadSchema, mockClearSchema, mockGetSchema, mockSaveSchema } =
  vi.hoisted(() => ({
    mockLoadSchema: vi.fn(),
    mockClearSchema: vi.fn(),
    mockGetSchema: vi.fn(),
    mockSaveSchema: vi.fn(),
  }));

const mockUseSchemaValidation = vi.fn((): UseSchemaValidationReturn => ({
  errors: [],
  validSchema: null,
}));

const VALID_SCHEMA = {
  openapi: '3.0.0',
  info: {
    title: 'Test API',
    version: '1.0.0',
  },
  paths: {},
};

const mockTranslations = (key: string): string => key;

vi.mock('@uiw/react-codemirror', () => ({
  default: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <textarea
      data-testid="mock-codemirror"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  ),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => mockTranslations,
}));

vi.mock('@/hooks/use-schema-validation', () => ({
  useSchemaValidation: (): UseSchemaValidationReturn =>
    mockUseSchemaValidation(),
}));

vi.mock('@/store/schema-store', () => ({
  useSchemaStore: () => ({
    loadSchema: mockLoadSchema,
    clearSchema: mockClearSchema,
  }),
}));

vi.mock('@/store/user-store', () => ({
  useUserStore: vi.fn(),
}));

vi.mock('@/app/actions/schema', () => ({
  getSchema: mockGetSchema,
  saveSchema: mockSaveSchema,
}));

const createMockUser = (id: string): AppUser => ({
  id,
  email: 'test@example.com',
  created_at: '',
});

const createMockUserStore = (user: AppUser | null): UserStore => ({
  user,
  setUser: vi.fn(),
  clearUser: vi.fn(),
});

describe('Editor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    mockUseSchemaValidation.mockReturnValue({
      errors: [],
      validSchema: VALID_SCHEMA,
    });

    vi.mocked(useUserStore).mockImplementation(
      (selector: (state: UserStore) => unknown): unknown =>
        selector(createMockUserStore(null)),
    );
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders editor', () => {
    renderWithProviders(<Editor />);

    expect(screen.getByTestId('mock-codemirror')).toBeInTheDocument();
  });

  it('updates editor value on change', () => {
    renderWithProviders(<Editor />);

    const editor = screen.getByTestId('mock-codemirror');

    fireEvent.change(editor, {
      target: {
        value: 'openapi: 3.0.0',
      },
    });

    expect(editor).toHaveValue('openapi: 3.0.0');
  });

  it('loads schema for authenticated user', async () => {
    mockGetSchema.mockResolvedValue({
      schema: 'openapi: 3.0.0',
      format: 'yaml',
    });

    vi.mocked(useUserStore).mockImplementation(
      (selector: (state: UserStore) => unknown): unknown =>
        selector(createMockUserStore(createMockUser('1'))),
    );

    renderWithProviders(<Editor />);

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(mockGetSchema).toHaveBeenCalled();

    expect(mockLoadSchema).toHaveBeenCalledWith('openapi: 3.0.0', 'yaml');
  });

  it('saves valid schema to server for authenticated user', async () => {
    mockSaveSchema.mockResolvedValue({
      success: true,
    });

    vi.mocked(useUserStore).mockImplementation(
      (selector: (state: UserStore) => unknown): unknown =>
        selector(createMockUserStore(createMockUser('1'))),
    );

    render(<Editor />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(mockLoadSchema).toHaveBeenCalled();

    expect(mockSaveSchema).toHaveBeenCalled();
  });

  it('does not save schema for anonymous user', async () => {
    render(<Editor />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(mockSaveSchema).not.toHaveBeenCalled();
  });

  it('clears save timeout after unmount', async () => {
    vi.mocked(useUserStore).mockImplementation(
      (selector: (state: UserStore) => unknown): unknown =>
        selector(createMockUserStore(createMockUser('1'))),
    );

    const { unmount } = render(<Editor />);

    unmount();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(mockSaveSchema).not.toHaveBeenCalled();
  });
});
