import classNames from 'classnames/bind';
import { cva, type VariantProps } from 'class-variance-authority';
import type { MouseEventHandler, ReactNode } from 'react';

import styles from './button.module.css';

const cx = classNames.bind(styles);

const buttonVariants = cva(cx('button'), {
  variants: {
    color: {
      basic: cx('basic'),
      primary: cx('primary'),
      secondary: cx('secondary'),
      transparent: cx('transparent'),
    },
    size: {
      small: cx('small'),
      medium: cx('medium'),
    },
    shape: {
      rounded: cx('rounded'),
      square: cx('square'),
    },
    isActive: {
      true: cx('active'),
    },
  },
  defaultVariants: {
    color: 'basic',
    size: 'medium',
    shape: 'square',
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
} & ButtonVariants;

export const Button = ({
  children,
  className,
  type,
  color,
  size,
  shape,
  isActive = false,
  disabled = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={buttonVariants({ color, size, shape, isActive, className })}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
