import { colors } from './colors';
import { fontWeights } from './font';

export const about = {
  aboutWrapper: {
    bg: colors.background,
    w: '100%',
    minH: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  aboutContainer: {
    maxW: '1100px',
    py: { base: 10, md: 16 },
    px: { base: 5, md: 8 },
  },
  heroTitle: {
    color: colors.brandPrimary,
    fontSize: 'xs',
    fontWeight: fontWeights.bold,
    textTransform: 'uppercase',
  },
  heroHeading: {
    color: colors.colorWhite,
    fontWeight: fontWeights.bold,
    lineHeight: '1.05',
    maxW: '720px',
    fontSize: {
      base: '3xl',
      md: '5xl',
    },
  },
  heroDescr: {
    maxW: '650px',
    color: colors.mutedForeground,
    fontSize: {
      base: 'md',
      md: 'lg',
    },
    lineHeight: '1.8',
  },
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
  rsCourseLink: {
    href: 'https://rs.school/courses/reactjs',
    target: '_blank',
    rel: 'noopener noreferrer',
    color: colors.brandPrimary,
    fontWeight: fontWeights.medium,
    _hover: { textDecoration: 'underline' },
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
