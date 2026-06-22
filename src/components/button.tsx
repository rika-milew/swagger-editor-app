import classNames from 'classnames/bind';
import type { MouseEventHandler, ReactNode } from 'react';

import styles from './button.module.css';

const cx = classNames.bind(styles);

type ButtonColor = 'basic' | 'primary' | 'secondary' | 'toggle';

type ButtonSize = 'small' | 'medium';

type ButtonShape = 'rounded' | 'square';

type ButtonType = 'button' | 'submit';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  type?: ButtonType;
  color?: ButtonColor;
  size?: ButtonSize;
  shape?: ButtonShape;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
  disabled?: boolean;
};

export const Button = ({
  children,
  className,
  type = 'button',
  color = 'basic',
  size = 'medium',
  shape = 'square',
  isActive = false,
  disabled = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cx(
        'button',
        color,
        size,
        shape,
        { active: isActive },
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
