import type { ReactNode } from 'react';
import { Box, VStack, Heading, Button, Text } from '@chakra-ui/react';
import { AuthInput } from './auth-input/auth-input';
import { formStyles } from '@/theme/form';
import { buttons } from '@/theme/buttons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import type { Path } from 'react-hook-form';
import { getErrorMessage } from '@/utils/get-error-message';

type FieldConfig<TSchema extends z.ZodObject> = {
  id: Path<z.input<TSchema>>;
  label: string;
  type: 'email' | 'password' | 'text';
  placeholder: string;
  helperText?: string;
};

type AuthFormProps<TSchema extends z.ZodObject> = {
  title: string;
  subtitle?: string;
  submitLabel: string;
  fields: FieldConfig<TSchema>[];
  helperContent?: ReactNode;
  bottomContent: ReactNode;
  schema: TSchema;
  onSubmitAction: (data: z.infer<TSchema>) => Promise<{ error?: string }>;
};

export function AuthForm<TSchema extends z.ZodObject>({
  title,
  subtitle,
  submitLabel,
  fields,
  helperContent,
  bottomContent,
  schema,
  onSubmitAction,
}: AuthFormProps<TSchema>) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.input<TSchema>, unknown, z.output<TSchema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<TSchema>) => {
    const result = await onSubmitAction(data);

    if (result.error) {
      setError('root.serverError', {
        type: 'server',
        message: result.error,
      });
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
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                error={getErrorMessage(errors[field.id])}
                helperText={field.helperText}
                {...register(field.id)}
              />
            ))}
            {helperContent}
            <Button
              {...buttons.submit}
              type="submit"
              loading={isSubmitting}
              loadingText="Please wait..."
            >
              {' '}
              {submitLabel}
            </Button>
          </VStack>
        </form>
        {bottomContent}
      </VStack>
    </Box>
  );
}
