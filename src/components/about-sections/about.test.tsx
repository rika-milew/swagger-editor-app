import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '@/test-utils/render-with-providers';
import AboutView from '../../views/about/about';

vi.mock('./hero-section', () => ({
  default: () => <div>HeroSection</div>,
}));

vi.mock('./stack-section', () => ({
  default: () => <div>StackSection</div>,
}));

vi.mock('./team-section', () => ({
  default: () => <div>TeamSection</div>,
}));

vi.mock('./school-section', () => ({
  default: () => <div>SchoolSection</div>,
}));

describe('AboutView', () => {
  it('renders all about sections', () => {
    renderWithProviders(<AboutView />);

    expect(screen.getByText('HeroSection')).toBeInTheDocument();
    expect(screen.getByText('StackSection')).toBeInTheDocument();
    expect(screen.getByText('TeamSection')).toBeInTheDocument();
    expect(screen.getByText('SchoolSection')).toBeInTheDocument();
  });
});
