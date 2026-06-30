'use client';

import type { ReactNode } from 'react';
import { Box, VStack, Heading, Button, Text } from '@chakra-ui/react';
import { AuthInput } from './auth-input/auth-input';
import { formStyles, buttons } from '@/theme';
import { useForm } from 'react-hook-form';
import type { Path, Resolver } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { getErrorMessage } from '@/utils/get-error-message';

type FieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type: 'email' | 'password' | 'text';
  placeholder: string;
};

type AuthFormProps<T extends FieldValues> = {
  title: string;
  subtitle?: string;
  submitLabel: string;
  fields: FieldConfig<T>[];
  helperContent?: ReactNode;
  switchFormLink: ReactNode;
  resolver: Resolver<T>;
  onSubmitAction: (data: T) => Promise<{ error?: string }>;
};

export function AuthForm<T extends FieldValues>({
  title,
  subtitle,
  submitLabel,
  fields,
  helperContent,
  switchFormLink,
  resolver,
  onSubmitAction,
}: AuthFormProps<T>) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver,
  });

  const onSubmit = async (data: T) => {
    console.log('Form submitted with data:', data);
    const actionResult = await onSubmitAction(data);

    console.log('Server action result:', actionResult);

    if (actionResult.error) {
      console.error('Server error:', actionResult.error);
      setError('root.serverError', {
        type: 'server',
        message: actionResult.error,
      });
      // TODO: Add server error display
    } else {
      console.log('Form submitted successfully');
    }
  };
  return (
    <Box {...formStyles.wrapper}>
      <VStack {...formStyles.content}>
        <VStack {...formStyles.header}>
          <Heading {...formStyles.title}>{title}</Heading>
          {subtitle && <Text {...formStyles.subtitle}>{subtitle}</Text>}
        </VStack>
        <form
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event);
          }}
          style={{ width: '100%' }}
        >
          <VStack {...formStyles.fields}>
            {fields.map((field) => (
              <AuthInput
                key={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                error={getErrorMessage(errors[field.name])}
                {...register(field.name)}
              />
            ))}
            {helperContent}
            <Button
              {...buttons.submit}
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Please wait...' : submitLabel}
            </Button>
          </VStack>
        </form>
        {switchFormLink}
      </VStack>
    </Box>
  );
}
