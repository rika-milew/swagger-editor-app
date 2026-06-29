import { fontWeights } from './font';

export const typography = {
  logoText: {
    fontSize: 'xl',
    fontWeight: fontWeights.medium,
  },

  navFooter: {
    fontSize: 'sm',
    fontWeight: fontWeights.medium,
    textTransform: 'uppercase',
  },

  authButton: {
    fontSize: 'xs',
    fontWeight: fontWeights.medium,
    textTransform: 'uppercase',
  },
} as const;
