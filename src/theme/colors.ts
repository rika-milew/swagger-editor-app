export const colors = {
  colorWhite: '#fff',

  background: 'hsl(240deg 9% 4%)',
  border: 'hsl(240deg 5% 16%)',
  panel: 'hsl(240deg 7% 8%)',
  textPrimary: 'hsl(240deg 9% 4%)',

  brandPrimary: 'oklch(86% .18 200)',
  brandSecondary: 'oklch(70% .22 305)',

  methodGet: 'oklch(72% .18 145)',
  methodPost: 'oklch(78% .16 80)',
  methodPut: 'oklch(72% .15 240)',
  methodDelete: 'oklch(65% .22 25)',

  foreground: 'oklch(92% .005 285)',
  cardForeground: 'oklch(95% .005 285)',
  popoverForeground: 'oklch(95% .005 285)',
  primaryForeground: 'oklch(14.5% .005 285)',
  secondary: 'oklch(27% .005 285)',
  secondaryForeground: 'oklch(95% .005 285)',

  muted: 'oklch(23% .005 285)',
  mutedForeground: 'oklch(62% .005 285)',

  accent: 'oklch(27% .005 285)',
  accentForeground: 'oklch(95% .005 285)',

  destructive: 'oklch(65% .22 25)',
  destructiveForeground: 'oklch(98% 0 0)',
  input: 'oklch(27% .005 285)',

  colorZinc500: 'oklch(55.2% .016 285.938)',
  colorZinc600: 'oklch(44.2% .017 285.786)',
  colorAuth: 'color-mix(in oklab, oklch(86% .18 200) 60%, transparent)',

  logoGlow: `
    0 0 0 1px rgba(255,255,255,.35),
    0 0 10px oklch(86% .18 200 / .55),
    0 0 22px oklch(86% .18 200 / .40),
    0 0 40px oklch(86% .18 200 / .18)
  `,

  nav: {
    active: 'white',
    inactive: 'hsl(240deg 5% 65%)',
  },
} as const;
