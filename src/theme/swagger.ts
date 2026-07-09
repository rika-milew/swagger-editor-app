import { colors } from '@/theme/colors';
import { fontWeights } from '@/theme/font';

export const swagger = {
  swaggerContainer: {
    maxW: '900px',
    mx: 'auto',
    mt: 0,
    bg: colors.background,
    border: '1px solid',
    borderColor: colors.border,
    borderRadius: 'xl',
    p: 8,

    display: 'flex',
    flexDirection: 'column',

    height: '70vh',
  },
  cardsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minH: 0,
    gap: 3,
    overflowY: 'auto',
    pr: 2,

    scrollbarWidth: 'thin',
    scrollbarColor: `${colors.colorZinc600} transparent`,

    '&::-webkit-scrollbar': {
      width: '6px',
    },

    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: colors.colorZinc600,
      borderRadius: '10px',
      border: '2px solid transparent',
      backgroundClip: 'content-box',
    },

    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: colors.colorZinc500,
    },
  },
  cardContainer: {
    width: '100%',

    display: 'flex',
    justify: 'space-between',
    align: 'center',

    gap: 3,
    flexWrap: 'wrap',

    border: '1px solid',
    borderColor: colors.border,
    borderRadius: 'lg',

    px: 4,
    py: 4,
    transition: '0.2s',
    _hover: {
      borderColor: colors.colorZinc500,
      bg: colors.surfaceHover,
    },
  },
  cardBadge: {
    color: 'white',
    px: 4,
    py: 1,
    borderRadius: 'md',
    minW: '70px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  topText: {
    fontSize: 'xs',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    color: colors.colorZinc500,
    mb: 4,
  },
  cardPathText: {
    color: colors.colorWhite,
    fontWeight: '600',
    fontSize: 'md',
  },
  endpointDetailsContainer: {
    mt: 4,
    p: 5,
    bg: colors.panel,
    border: '1px solid',
    borderColor: colors.border,
    borderRadius: 'lg',
  },
  endpointParametersContainer: {
    align: 'center',
    gap: 3,
    px: 3,
    py: 2,
    bg: colors.surface,
    borderRadius: 'md',
    border: '1px solid',
    borderColor: colors.border,
  },
  paramText: {
    fontSize: 'sm',
    fontWeight: fontWeights.medium,
    color: colors.foreground,
    letterSpacing: '0.01em',
  },

  paramTypeText: {
    fontSize: 'xs',
    color: colors.brandPrimary,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  sectionTitle: {
    mb: 3,
    fontWeight: fontWeights.bold,
    color: colors.foreground,
  },
  requestBodyContent: {
    p: 4,
    bg: colors.background,
    border: '1px solid',
    borderColor: colors.border,
    borderRadius: 'md',
    color: colors.cardForeground,
    fontSize: 'sm',
    overflowX: 'auto',
  },
  responsesContent: {
    p: 4,
    bg: colors.background,
    border: '1px solid',
    borderColor: colors.border,
    borderRadius: 'md',
    color: colors.cardForeground,
    fontSize: 'sm',
    overflowX: 'auto',
  },
};
