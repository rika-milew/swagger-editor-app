import { colors } from './colors';
import { fontWeights } from './font';

export const buttons = {
  signIn: {
    variant: 'ghost',
    bg: 'transparent',
    color: colors.nav.inactive,
    fontWeight: fontWeights.medium,
    borderRadius: 'full',

    _hover: {
      bg: 'transparent',
      color: colors.nav.active,
    },
  },

  signUp: {
    bg: colors.colorWhite,
    color: colors.background,
    fontWeight: fontWeights.medium,
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
