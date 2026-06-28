import { useId } from 'react';
import { Box, Input, Field } from '@chakra-ui/react';
import { authInputStyles } from '@/theme/input';

type AuthInputProps = {
  label: string;
  type: 'email' | 'password' | 'text';
  placeholder: string;
  error?: string;
  helperText?: string;
};

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
