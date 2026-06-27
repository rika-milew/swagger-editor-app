import { Box, Input, Field } from '@chakra-ui/react';
import { authInputStyles } from '@/theme/input';

type AuthInputProps = {
  id: string;
  label: string;
  type: 'email' | 'password' | 'text';
  placeholder: string;
  error?: string;
  helperText?: string;
};

export function AuthInput({
  id,
  label,
  type,
  placeholder,
  error,
}: AuthInputProps) {
  return (
    <Field.Root key={id} invalid={!!error}>
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
