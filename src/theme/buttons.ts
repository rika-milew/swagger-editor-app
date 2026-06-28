import { colors } from './colors';

export const buttons = {
  submit: {
    bg: colors.brandPrimary,
    color: colors.background,
    h: 10,
    px: 3,
    w: '100%',
    mt: 2,
    fontWeight: 'var(--font-weight-extra-bold)',
    fontSize: 'sm',
    _hover: {
      bg: colors.methodPut,
    },
    _focus: {
      bg: colors.methodPut,
    },
  },
} as const;
