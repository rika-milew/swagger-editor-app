import { colors } from './colors';
import { fontWeights } from './font';

export const buttons = {
  signIn: {
    variant: 'ghost',
    bg: 'transparent',
    color: colors.nav.inactive,
    fontWeight: fontWeights.medium,
    borderRadius: '20px',
    px: 5,
    border: '1px solid',
    borderColor: colors.border,
    transition: 'all 0.2s ease-in-out',

    _hover: {
      bg: 'transparent',
      color: colors.nav.active,
      borderColor: colors.nav.active,
    },
  },

  signUp: {
    bg: colors.colorWhite,
    color: colors.background,
    fontWeight: fontWeights.medium,
    borderRadius: '20px',
    px: 5,
    transition: 'all 0.2s ease-in-out',

    _hover: {
      bg: colors.brandPrimary,
    },
  },
  signOut: {
    bg: 'transparent',
    color: colors.colorWhite,
    fontWeight: fontWeights.medium,
    borderRadius: '20px',
    px: 5,
    border: '1px solid',
    borderColor: colors.border,
    transition: 'all 0.2s ease-in-out',

    _hover: {
      color: colors.background,
      bg: colors.brandPrimary,
    },
  },
  languageSwitcher: {
    variant: 'ghost',
    bg: 'transparent',
    color: colors.colorZinc600,

    px: 3,
    py: 2,

    border: '1px solid transparent',
    borderRadius: 'md',

    _hover: {
      bg: 'transparent',
      color: colors.colorWhite,
      border: '1px solid',
      borderColor: colors.brandPrimary,
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
  truItOut: {
    size: 'sm',
    h: '32px',
    px: 4,
    bg: colors.brandPrimary,
    color: colors.primaryForeground,
    fontSize: 'sm',
    fontWeight: '600',
    borderRadius: 'md',
    transition: 'all 0.2s',
    _hover: {
      bg: 'hsl(183deg 100% 45%)',
      boxShadow: `0 0 10px ${colors.brandPrimary}`,
    },
  },
  execute: {
    size: 'sm',
    h: '32px',
    px: 4,
    bg: colors.brandPrimary,
    color: colors.primaryForeground,
    fontSize: 'sm',
    fontWeight: '600',
    borderRadius: 'md',
    transition: 'all 0.2s',
    _hover: {
      bg: 'hsl(183deg 100% 45%)',
      boxShadow: `0 0 10px ${colors.brandPrimary}`,
    },
  },
  generateCurl: {
    size: 'sm',
    h: '32px',
    px: 4,
    variant: 'outline',
    borderColor: colors.brandSecondary,
    color: colors.brandSecondary,
    fontSize: 'sm',
    fontWeight: '500',
    borderRadius: 'md',
    transition: 'all 0.2s',
    _hover: {
      bg: colors.brandSecondary,
      color: colors.primaryForeground,
      boxShadow: `0 0 10px ${colors.brandSecondary}`,
    },
  },
} as const;
