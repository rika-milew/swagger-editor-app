import { useId } from 'react';
import { Box, Input, Field } from '@chakra-ui/react';
import { authInputStyles } from '@/theme';
import type { AuthInputProps } from '@/types/auth.types';

export function AuthInput({ label, type, placeholder, error }: AuthInputProps) {
  const id = useId();

  return (
    <Field.Root invalid={!!error}>
      <Field.Label htmlFor={id} {...authInputStyles.label}>
        {label}
      </Field.Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...authInputStyles.input}
        {...(error ? authInputStyles.inputError : {})}
      />
      <Box {...authInputStyles.errorContainer}>
        {error ? (
          <Field.ErrorText {...authInputStyles.errorText}>
            {error}
          </Field.ErrorText>
        ) : null}
      </Box>
    </Field.Root>
  );
}
