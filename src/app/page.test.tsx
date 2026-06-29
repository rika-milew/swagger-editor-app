import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';
import { Provider } from '@/providers/chakraProvider';

describe('Home page', () => {
  it('renders the main heading', () => {
    render(
      <Provider>
        <Home />
      </Provider>,
    );
    expect(
      screen.getByRole('heading', { name: /swagger editor app/i }),
    ).toBeInTheDocument();
  });
});
