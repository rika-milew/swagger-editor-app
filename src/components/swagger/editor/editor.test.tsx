import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { Editor } from './editor';
import { useUserStore } from '@/store/user-store';

const { mockLoadSchema, mockGetLatestSchema, mockSaveSchema } = vi.hoisted(
  () => ({
    mockLoadSchema: vi.fn(),
    mockGetLatestSchema: vi.fn(),
    mockSaveSchema: vi.fn(),
  }),
);

const MOCK_TIMEOUT_MS = 500;

vi.mock('@uiw/react-codemirror', () => {
  return {
    default: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (val: string) => void;
    }) => (
      <textarea
        data-testid="mock-codemirror"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  };
});

const mockT = (key: string) => key;

vi.mock('next-intl', () => ({
  useTranslations: () => mockT,
  useLocale: () => 'en',
}));

vi.mock('@/store/user-store', () => ({
  useUserStore: vi.fn(),
}));

vi.mock('@/store/schema-store', () => ({
  useSchemaStore: () => ({ loadSchema: mockLoadSchema }),
}));

vi.mock('@/app/actions/schema', () => ({
  getLatestSchema: mockGetLatestSchema,
  saveSchema: mockSaveSchema,
}));

describe('Editor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    vi.mocked(useUserStore).mockReturnValue(null);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render with initial default code and update text on change', () => {
    render(<Editor />);

    const textarea = screen.getByTestId('mock-codemirror');
    expect(textarea).toBeInTheDocument();

    const defaultCode = '# Write code here!';

    expect(textarea).toHaveValue(defaultCode);

    const newCode = 'server:\n  port: 9000';
    fireEvent.change(textarea, { target: { value: newCode } });

    expect(textarea).toHaveValue(newCode);
  });

  it('should not fetch schema when user is not authenticated', async () => {
    vi.mocked(useUserStore).mockReturnValue(null);

    render(<Editor />);

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(mockLoadSchema).not.toHaveBeenCalled();
  });

  it('should fetch latest schema when user is authenticated', async () => {
    const mockSchema = { schema: 'code', format: 'yaml' as const };
    mockGetLatestSchema.mockResolvedValueOnce(mockSchema);
    vi.mocked(useUserStore).mockReturnValue({
      user: { id: '1', name: 'Test' },
    });

    render(<Editor />);

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(mockGetLatestSchema).toHaveBeenCalledTimes(1);
    expect(mockLoadSchema).toHaveBeenCalledWith(
      mockSchema.schema,
      mockSchema.format,
    );
  });

  it('should handle error when fetching schema fails', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {
        vi.fn();
      });
    mockGetLatestSchema.mockRejectedValueOnce(new Error('Fetch failed'));
    vi.mocked(useUserStore).mockReturnValue({
      user: { id: '1', name: 'Test' },
    });

    render(<Editor />);

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('schemaErrors.loadError');
    consoleErrorSpy.mockRestore();
  });

  it('should auto-save when code changes', async () => {
    mockSaveSchema.mockResolvedValueOnce({ error: null });

    render(<Editor />);

    const textarea = screen.getByTestId('mock-codemirror');
    fireEvent.change(textarea, { target: { value: 'new content' } });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(mockSaveSchema).toHaveBeenCalledWith({
      schema: 'new content',
      format: 'yaml',
    });
  });

  it('should not auto-save when value is initial code', async () => {
    vi.mocked(useUserStore).mockReturnValue({
      user: { id: '1', name: 'Test' },
    });

    render(<Editor />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(mockSaveSchema).not.toHaveBeenCalled();
  });

  it('should handle save error correctly', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {
        vi.fn();
      });

    mockSaveSchema.mockResolvedValueOnce({ error: 'Save failed' });
    vi.mocked(useUserStore).mockReturnValue({
      user: { id: '1', name: 'Test' },
    });

    render(<Editor />);

    const textarea = screen.getByTestId('mock-codemirror');
    fireEvent.change(textarea, { target: { value: 'new content' } });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('schemaErrors.saveError');
    consoleErrorSpy.mockRestore();
  });

  it('should debounce save calls', async () => {
    mockSaveSchema.mockResolvedValue({ error: null });
    vi.mocked(useUserStore).mockReturnValue({
      user: { id: '1', name: 'Test' },
    });

    render(<Editor />);

    const textarea = screen.getByTestId('mock-codemirror');

    fireEvent.change(textarea, { target: { value: 'change 1' } });
    fireEvent.change(textarea, { target: { value: 'change 2' } });
    fireEvent.change(textarea, { target: { value: 'final change' } });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(MOCK_TIMEOUT_MS);
    });
    expect(mockSaveSchema).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(MOCK_TIMEOUT_MS);
    });

    expect(mockSaveSchema).toHaveBeenCalledTimes(1);
    expect(mockSaveSchema).toHaveBeenCalledWith({
      schema: 'final change',
      format: 'yaml',
    });
  });

  it('should handle exception during save', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {
        vi.fn();
      });

    mockSaveSchema.mockRejectedValueOnce(new Error('Network error'));
    vi.mocked(useUserStore).mockReturnValue({
      user: { id: '1', name: 'Test' },
    });

    render(<Editor />);

    const textarea = screen.getByTestId('mock-codemirror');
    fireEvent.change(textarea, { target: { value: 'new content' } });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should clear save timeout on unmount', async () => {
    mockSaveSchema.mockResolvedValue({ error: null });
    vi.mocked(useUserStore).mockReturnValue({
      user: { id: '1', name: 'Test' },
    });

    const { unmount } = render(<Editor />);

    const textarea = screen.getByTestId('mock-codemirror');
    fireEvent.change(textarea, { target: { value: 'new content' } });

    unmount();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(mockSaveSchema).not.toHaveBeenCalled();
  });
});
