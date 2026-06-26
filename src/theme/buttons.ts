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
  languageSwitcher: {
    variant: 'ghost',
    bg: 'transparent',
    color: colors.colorZinc600,

    _hover: {
      bg: 'transparent',
      color: colors.colorWhite,
    },
  },
  auth: {
    variant: 'ghost',
    bg: 'transparent',
    color: colors.colorAuth,
    border: '1px solid',
    borderColor: colors.border,
    borderRadius: 'sm',
    fontWeight: '500',
    px: 4,

    _hover: {
      bg: 'transparent',
      color: colors.brandPrimary,
    },
  },
  submit: {
    bg: colors.brandPrimary,
    color: colors.background,
    h: 10,
    px: 3,
    w: '100%',
    mt: 2,
    fontWeight: '600',
    fontSize: 'sm',
    _hover: {
      filter: 'brightness(1.1)',
    },
    _focus: {
      filter: 'brightness(1.1)',
    },
  },
} as const;
