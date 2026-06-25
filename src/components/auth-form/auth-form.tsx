import type { ReactNode } from 'react';
import { Box, VStack, Heading, Button, Text } from '@chakra-ui/react';
import { AuthInput } from './auth-input';

type FieldConfig = {
  id: string;
  label: string;
  type: 'email' | 'password' | 'text';
  placeholder: string;
  error?: string;
  helperText?: string;
};

type AuthFormProps = {
  title: string;
  subtitle?: string;
  submitLabel: string;
  fields: FieldConfig[];
  helperContent?: ReactNode;
  bottomContent: ReactNode;
  onSubmit?: () => void;
};

export function AuthForm({
  title,
  subtitle,
  submitLabel,
  fields,
  helperContent,
  bottomContent,
  onSubmit,
}: AuthFormProps) {
  return (
    <Box
      w="full"
      bg="gray.850"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.800"
      borderRadius="1rem"
      p={8}
      boxShadow="lg"
    >
      <VStack gap={6} align="stretch">
        <VStack gap={1.5}>
          <Heading as="h1" size="2xl" textAlign="center" color="white">
            {title}
          </Heading>
          {subtitle && (
            <Text color="gray.400" fontSize="sm" textAlign="center">
              {subtitle}
            </Text>
          )}
        </VStack>

        <VStack gap={3} align="stretch">
          {fields.map((field) => (
            <AuthInput
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              error={field.error}
              helperText={field.helperText}
            />
          ))}
          {helperContent}
          <Button
            bg="blue.500"
            color="gray.900"
            h={12}
            px={3}
            w="100%"
            mt={2}
            fontWeight="semibold"
            fontSize="sm"
            _hover={{
              filter: 'brightness(1.1)',
            }}
            _focus={{
              filter: 'brightness(1.1)',
            }}
            onClick={onSubmit}
          >
            {submitLabel}
          </Button>
        </VStack>

        {bottomContent}
      </VStack>
    </Box>
  );
}
