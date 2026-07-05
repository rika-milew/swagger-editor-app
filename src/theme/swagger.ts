import { colors } from '@/theme/colors';

export const swagger = {
  swaggerContainer: {
    maxW: '900px',
    mx: 'auto',
    mt: 10,
    bg: colors.background,
    border: '1px solid',
    borderColor: colors.border,
    borderRadius: 'xl',
    p: 8,
  },
  cardContainer: {
    justify: 'space-between',
    align: 'center',
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
};
