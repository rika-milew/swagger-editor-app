import { colors } from './colors';

export const buttons = {
  signIn: {
    variant: 'ghost',
    bg: 'transparent',
    color: colors.nav.inactive,
    fontWeight: '500',
    borderRadius: 'full',

    _hover: {
      bg: 'transparent',
      color: colors.nav.active,
    },
  },

  signUp: {
    bg: colors.colorWhite,
    color: colors.background,
    fontWeight: '600',
    borderRadius: 'full',
    px: 5,

    _hover: {
      bg: colors.brandPrimary,
    },
  },
} as const;
