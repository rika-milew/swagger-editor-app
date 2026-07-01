import { colors } from './colors';

const FOOTER_HEIGHT = '80px';

export const container = {
  headerBox: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    bg: colors.background,
    borderBottom: '1px solid',
    borderColor: colors.border,
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
