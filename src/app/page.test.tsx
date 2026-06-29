import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';

describe('Home page layout', () => {
  it('renders with the editor and a viewer', () => {
    render(<Home />);

    const editor = screen.getByTestId('editor-block');
    expect(editor).toBeInTheDocument();

    const viewer = screen.getByTestId('viewer-block');
    expect(viewer).toBeInTheDocument();
  });
});
