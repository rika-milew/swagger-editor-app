export type AuthInputProps = {
  label: string;
  type: 'email' | 'password' | 'text';
  placeholder: string;
  error?: string;
  helperText?: string;
};

export type FieldConfig = AuthInputProps & {
  name: string;
};
