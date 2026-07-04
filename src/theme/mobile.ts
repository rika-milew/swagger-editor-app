import { colors } from './colors';

export const mobile = {
  menuContent: {
    bg: colors.background,
    color: colors.textPrimary,
    borderLeft: '1px solid',
    borderColor: colors.border,
  },
  openMenuButton: {
    'aria-label': 'Open menu',
    variant: 'ghost',
    color: colors.colorWhite,

    _hover: {
      bg: 'transparent',
      opacity: 0.7,
    },

    _active: {
      bg: 'transparent',
      transform: 'scale(0.95)',
    },
  },
  closeMenuButton: {
    'aria-label': 'Close menu',
    variant: 'ghost',

    _hover: {
      bg: 'transparent',
      opacity: 0.7,
    },

    _active: {
      bg: 'transparent',
      transform: 'scale(0.95)',
    },
  },
} as const;
