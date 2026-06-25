import { Box, Input, Field } from '@chakra-ui/react';

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
      <Field.Label
        color="gray.400"
        fontSize="xs"
        mb={1}
        fontWeight="medium"
        letterSpacing="wide"
        fontFamily="mono"
        textTransform="uppercase"
      >
        {label}
      </Field.Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        bg="gray.900"
        borderColor="gray.800"
        borderRadius="0.5rem"
        color="white"
        px={3}
        py={2}
        _placeholder={{ color: 'gray.400' }}
        _focus={{
          borderColor: error ? 'red.400' : 'blue.500',
          borderWidth: '2px',
          outline: 'none',
          boxShadow: error
            ? '0 0 0 1px red.400'
            : '0 0 0 1px var(--chakra-colors-blue-500)',
        }}
        _invalid={{
          borderColor: 'red.500',
        }}
        css={{
          '&:-webkit-autofill': {
            transition: 'background-color 9999s ease-in-out 0s',
            WebkitTextFillColor: 'var(--chakra-colors-gray-400) !important',
            caretColor: 'var(--chakra-colors-gray-400)',
          },
        }}
      />
      <Box minH={5} mt={0.25}>
        {error ? (
          <Field.ErrorText color="red.400" fontSize="xs">
            {error}
          </Field.ErrorText>
        ) : null}
      </Box>
    </Field.Root>
  );
}
