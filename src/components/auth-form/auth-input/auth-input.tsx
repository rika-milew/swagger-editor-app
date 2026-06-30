import { useId, useState } from 'react';
import { Box, Input, Field, IconButton } from '@chakra-ui/react';
import { authInputStyles } from '@/theme/input';
import type { AuthInputProps } from '@/types/auth.types';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { forwardRef } from 'react';

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, type, placeholder, error, ...rest }, ref) => {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    return (
      <Field.Root invalid={!!error}>
        <Field.Label htmlFor={id} {...authInputStyles.label}>
          {label}
        </Field.Label>
        <Box position="relative" width="100%">
          <Input
            ref={ref}
            id={id}
            type={inputType}
            placeholder={placeholder}
            {...authInputStyles.input}
            {...(error ? authInputStyles.inputError : {})}
            paddingRight={isPassword ? '2.5rem' : undefined}
            {...rest}
          />
          {isPassword && (
            <IconButton
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              size="xs"
              variant="ghost"
              {...authInputStyles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <LuEyeOff /> : <LuEye />}
            </IconButton>
          )}
        </Box>
        <Box {...authInputStyles.errorContainer}>
          {error && (
            <Field.ErrorText {...authInputStyles.errorText}>
              {error}
            </Field.ErrorText>
          )}
        </Box>
      </Field.Root>
    );
  },
);

AuthInput.displayName = 'AuthInput';
