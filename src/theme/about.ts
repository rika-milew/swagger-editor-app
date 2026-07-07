import { colors } from './colors';

export const about = {
  stackItemConteiner: {
    px: '4',
    py: '2',
    borderRadius: 'full',
    bg: colors.panel,
    color: colors.cardForeground,
    border: '1px solid',
    borderColor: colors.border,
    fontWeight: '500',
    fontSize: 'sm',
  },
  membersContent: {
    direction: 'column',
    align: 'center',
    bg: colors.panel,
    border: '1px solid',
    borderColor: colors.border,
    borderRadius: 'xl',
    transition: 'all .25s',
    _hover: {
      transform: 'translateY(-6px)',
      borderColor: colors.brandPrimary,
    },
  },
  avatarBox: {
    w: '72px',
    h: '72px',
    borderRadius: 'full',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgGradient: 'linear(to-br, purple.400, purple.600)',
    color: 'white',
    fontSize: '2xl',
    fontWeight: '700',
    boxShadow: colors.logoGlow,
  },
  rsFlexContent: {
    bg: colors.panel,
    border: '1px solid',
    borderColor: colors.border,
    borderRadius: 'xl',
  },
  rsStackContainer: {
    direction: {
      base: 'column',
      md: 'row',
    },
    justify: 'space-between',
    align: {
      base: 'start',
      md: 'center',
    },
    gap: 8,
  },
  rsLogoLink: {
    href: 'https://rs.school/',
    target: '_blank',
    colorScheme: 'cyan',
    whiteSpace: 'nowrap',
    transition: 'all 0.3s ease',
    _hover: {
      transform: 'translateY(-4px) scale(1.05)',
      filter: 'brightness(1.1)',
      boxShadow: colors.logoGlow,
    },
  },
  rsImage: {
    width: 120,
    height: 120,
  },
} as const;
