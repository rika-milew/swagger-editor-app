import { colors } from './colors';

const FOOTER_HEIGHT = '80px';

export const container = {
  headerBox: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%',
    display: 'block',
    alignSelf: 'stretch',

    bg: colors.background,
    borderBottom: '1px solid',
    borderColor: colors.border,

    transition: 'all 0.3s ease',

    _after: {},

    '&[data-scrolled="true"]': {
      bg: 'hsl(240deg 20% 8% / 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid hsl(183deg 50% 50%)',
      boxShadow: '0 12px 35px hsl(0deg 0% 0% / 0.6)',
    },
  },
  headerContent: {
    width: '100%',
    maxW: '1200px',
    mx: 'auto',

    px: {
      base: 4,
      md: 6,
    },

    h: {
      base: '64px',
      md: '80px',
    },

    align: 'center',
    justify: 'space-between',

    transition: 'height 0.3s ease, padding 0.3s ease',

    '&[data-scrolled="true"]': {
      h: {
        base: '56px',
        md: '64px',
      },
    },
  },
  footerBox: {
    h: FOOTER_HEIGHT,
    bg: colors.background,
    borderTop: '1px solid',
    borderColor: colors.border,
  },
  flexContainer: {
    width: '100%',
    maxW: '1200px',
    mx: 'auto',
    align: 'center',
    justify: 'space-between',
  },
  pageContainer: {
    w: '100%',
    maxW: '1200px',
    mx: 'auto',
  },
};
