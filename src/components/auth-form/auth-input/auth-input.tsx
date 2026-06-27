import { Box, Input, Field } from '@chakra-ui/react';
import { authInputStyles } from '@/theme/input';
import { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';

type AuthInputProps = {
  id: string;
  label: string;
  type: 'email' | 'password' | 'text';
  placeholder: string;
  error?: FieldError;
};

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ id, label, type, placeholder, error, ...rest }, ref) => {
    return (
      <Field.Root key={id} invalid={!!error}>
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
          {error ? (
            <Field.ErrorText {...authInputStyles.errorText}>
              {error.message}
            </Field.ErrorText>
          ) : null}
        </Box>
      </Field.Root>
    );
  },
);

AuthInput.displayName = 'AuthInput';
