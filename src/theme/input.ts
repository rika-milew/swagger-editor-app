import { colors } from './colors';

export const authInputStyles = {
  label: {
    color: colors.colorZinc400,
    fontSize: 'xs',
    mb: 1,
    fontWeight: 'var(--font-weight-extra-bold)',
    letterSpacing: '0.05em',
    fontFamily: 'var(--font-jetbrains-mono)',
    textTransform: 'uppercase',
  },
  input: {
    bg: colors.background,
    borderColor: colors.border,
    borderRadius: '0.5rem',
    color: colors.colorWhite,
    px: 3,
    py: 2,
    outline: 'none',
    _placeholder: { color: colors.colorZinc400 },
    _focus: {
      borderColor: colors.brandPrimary,
      borderWidth: '1px',
      outline: 'none',
      boxShadow: `0 0 0 1px ${colors.brandPrimary}`,
    },
    _invalid: {
      borderColor: colors.destructive,
      outline: 'none',
      boxShadow: 'none',
    },
    css: {
      '&:-webkit-autofill': {
        transition: 'background-color 9999s ease-in-out 0s',
        WebkitTextFillColor: `${colors.colorWhite} !important`,
        caretColor: colors.colorZinc400,
      },
    },
  },
  inputError: {
    borderColor: colors.destructive,
    _focus: {
      borderColor: colors.destructive,
      borderWidth: '2px',
      outline: 'none',
      boxShadow: `0 0 0 1px ${colors.destructive}`,
    },
  },
  errorContainer: {
    minH: 5,
    mt: 0.25,
  },
  errorText: {
    color: colors.destructive,
    fontSize: 'xs',
  },
  passwordToggle: {
    position: 'absolute',
    right: '2',
    top: '50%',
    transform: 'translateY(-50%)',
    bg: 'transparent',
    color: colors.colorZinc400,
    tabIndex: -1,
    zIndex: 1,
    _hover: { bg: 'transparent', color: colors.colorWhite },
    _active: { bg: 'transparent' },
  },
};
