import type { ReactNode } from 'react';
import { Box, VStack, Heading, Button, Text } from '@chakra-ui/react';
import { AuthInput } from './auth-input/auth-input';
import { formStyles } from '@/theme/form';
import { buttons } from '@/theme/buttons';

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
    <Box {...formStyles.wrapper}>
      <VStack {...formStyles.content}>
        <VStack {...formStyles.header}>
          <Heading {...formStyles.title}>{title}</Heading>
          {subtitle && <Text {...formStyles.subtitle}>{subtitle}</Text>}
        </VStack>
        <VStack {...formStyles.fields}>
          {fields.map((field) => (
            <AuthInput
              key={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              error={field.error}
              helperText={field.helperText}
            />
          ))}
          {helperContent}
          <Button {...buttons.submit} onClick={onSubmit}>
            {submitLabel}
          </Button>
        </VStack>
        {bottomContent}
      </VStack>
    </Box>
  );
}
