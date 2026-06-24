import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './button';
import styles from './button.module.css';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click</Button>);
    expect(screen.getByText('Click')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button', { name: /test/i });

    expect(button).toHaveClass(styles.button);
    expect(button).toHaveClass(styles.basic);
    expect(button).toHaveClass(styles.medium);
    expect(button).toHaveClass(styles.square);

    expect(button).not.toHaveClass('active');
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('type', 'button');
  });
});

it('applies primary color class', () => {
  render(<Button color="primary">Primary</Button>);
  expect(screen.getByRole('button')).toHaveClass(styles.primary);
});

it('applies secondary color class', () => {
  render(<Button color="secondary">Secondary</Button>);
  expect(screen.getByRole('button')).toHaveClass(styles.secondary);
});

it('applies transparent color class', () => {
  render(<Button color="transparent">Transparent</Button>);
  expect(screen.getByRole('button')).toHaveClass(styles.transparent);
});

it('applies small size class', () => {
  render(<Button size="small">Small</Button>);
  expect(screen.getByRole('button')).toHaveClass(styles.small);
});

it('applies rounded shape class', () => {
  render(<Button shape="rounded">Rounded</Button>);
  expect(screen.getByRole('button')).toHaveClass(styles.rounded);
});

it('applies square shape class', () => {
  render(<Button shape="square">Square</Button>);
  expect(screen.getByRole('button')).toHaveClass(styles.square);
});

it('applies active class when isActive is true', () => {
  render(<Button isActive>Active</Button>);
  expect(screen.getByRole('button')).toHaveClass(styles.active);
});

it('does not apply active class when isActive is false', () => {
  render(<Button isActive={false}>Inactive</Button>);
  expect(screen.getByRole('button')).not.toHaveClass(styles.active);
});

it('disables button when disabled is true', () => {
  render(<Button disabled>Disabled</Button>);
  expect(screen.getByRole('button')).toBeDisabled();
});

it('does not disable button when disabled is false', () => {
  render(<Button disabled={false}>Enabled</Button>);
  expect(screen.getByRole('button')).not.toBeDisabled();
});

it('has type button by default', () => {
  render(<Button>Button</Button>);
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
});

it('has type submit when specified', () => {
  render(<Button type="submit">Submit</Button>);
  expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
});

it('calls onClick when clicked', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<Button onClick={handleClick}>Click</Button>);
  await user.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

it('does not call onClick when disabled', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(
    <Button onClick={handleClick} disabled>
      Click
    </Button>,
  );
  await user.click(screen.getByRole('button'));

  expect(handleClick).not.toHaveBeenCalled();
});

it('applies custom className', () => {
  render(<Button className="custom-class">Custom</Button>);
  const button = screen.getByRole('button');
  expect(button.className).toContain('custom-class');
});

it('passes through additional HTML attributes', () => {
  render(
    <Button data-testid="test-button" aria-label="Test">
      Button
    </Button>,
  );
  const button = screen.getByTestId('test-button');
  expect(button).toHaveAttribute('aria-label', 'Test');
});
