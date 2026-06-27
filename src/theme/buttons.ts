import { colors } from './colors';

export const buttons = {
  submit: {
    bg: colors.brandPrimary,
    color: colors.background,
    h: 10,
    px: 3,
    w: '100%',
    mt: 2,
    fontWeight: 'var(--font-weight-medium)',
    fontSize: 'sm',
    _hover: {
      filter: 'brightness(1.1)',
    },
    _focus: {
      filter: 'brightness(1.1)',
    },
  },
} as const;
