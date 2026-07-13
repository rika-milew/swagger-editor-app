export type AuthInputProps = {
  label: string;
  type: 'email' | 'password' | 'text';
  placeholder: string;
  error?: string;
};

export type AppUser = {
  id: string;
  email: string;
  created_at: string;
};
