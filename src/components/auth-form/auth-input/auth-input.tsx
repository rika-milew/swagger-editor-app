import { Box, Input, Field } from '@chakra-ui/react';
import { authInputStyles } from '@/theme/input';
import { forwardRef } from 'react';

type AuthInputProps = {
  id: string;
  label: string;
  type: 'email' | 'password' | 'text';
  placeholder: string;
  error?: string;
  helperText?: string;
};

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ id, label, type, placeholder, error, helperText, ...rest }, ref) => {
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
              {error}
            </Field.ErrorText>
          ) : helperText ? (
            <Field.HelperText>{helperText}</Field.HelperText>
          ) : null}
        </Box>
      </Field.Root>
    );
  },
);

AuthInput.displayName = 'AuthInput';
