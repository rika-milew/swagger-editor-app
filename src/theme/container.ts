import { colors } from './colors';

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
    h: '80px',
    bg: colors.background,
    borderTop: '1px solid',
    borderColor: colors.border,
  },
  layoutContainer: {
    maxW: '1200px',
    mx: 'auto',
    align: 'center',
    justify: 'space-between',
  },
};
