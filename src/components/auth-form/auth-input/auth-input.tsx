import { useId } from 'react';
import { Box, Input, Field } from '@chakra-ui/react';
import { authInputStyles } from '@/theme/input';
import type { AuthInputProps } from '@/types/auth.types';
import { forwardRef } from 'react';

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, type, placeholder, error, ...rest }, ref) => {
    const id = useId();
    return (
      <Field.Root invalid={!!error}>
        <Field.Label htmlFor={id} {...authInputStyles.label}>
          {label}
        </Field.Label>
        <Input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          {...authInputStyles.input}
          {...(error ? authInputStyles.inputError : {})}
          {...rest}
        />
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
