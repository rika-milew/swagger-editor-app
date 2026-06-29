import type { ReactNode } from 'react';
import { Box, VStack, Heading, Button, Text } from '@chakra-ui/react';
import { AuthInput } from './auth-input/auth-input';
import { formStyles } from '@/theme';
import { buttons } from '@/theme';
import type { FieldConfig } from '@/types/auth.types';

type AuthFormProps = {
  title: string;
  subtitle?: string;
  submitLabel: string;
  fields: FieldConfig[];
  helperContent?: ReactNode;
  switchFormLink: ReactNode;
  onSubmit?: () => void;
};

export function AuthForm({
  title,
  subtitle,
  submitLabel,
  fields,
  helperContent,
  switchFormLink,
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
              key={field.name}
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
        {switchFormLink}
      </VStack>
    </Box>
  );
}
