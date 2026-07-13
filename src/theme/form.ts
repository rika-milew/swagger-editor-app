import { colors } from './colors';

export const formStyles = {
  wrapper: {
    w: 'full',
    bg: colors.panel,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: '1rem',
    p: 8,
    boxShadow: 'lg',
  },
  header: {
    gap: 1.5,
  },
  content: {
    gap: 6,
    align: 'stretch',
  },
  title: {
    as: 'h1',
    size: '2xl',
    textAlign: 'center',
    color: colors.colorWhite,
  },
  subtitle: {
    color: colors.colorZinc400,
    fontSize: 'sm',
    textAlign: 'center',
  },
  fields: {
    gap: 3,
    align: 'stretch',
  },
} as const;
