export const colors = {
  colorWhite: 'hsl(0deg 0% 100%)',

  background: 'hsl(240deg 10% 4%)',
  blackOverlay: 'hsl(0deg 0% 0% / 0.6)',
  border: 'hsl(240deg 5% 16%)',
  textPrimary: 'hsl(240deg 9% 4%)',
  panel: 'hsl(240deg 7% 8%)',

  brandPrimary: 'hsl(183deg 100% 50%)',
  brandSecondary: 'hsl(273deg 100% 72%)',
  brandPrimeryLight: 'hsl(183deg 100% 45%)',

  methodGet: 'hsl(145deg 60% 60%)',
  methodPost: 'hsl(80deg 70% 65%)',
  methodPut: 'hsl(202deg 93% 58%)',
  methodPatch: 'hsl(270deg 70% 65%)',
  methodDelete: 'hsl(25deg 70% 60%)',
  methodDefault: 'hsl(0deg 0% 50%)',

  surface: 'hsl(240deg 7% 9%)',
  surfaceHover: 'hsl(240deg 8% 16%)',

  foreground: 'hsl(285deg 10% 92%)',
  cardForeground: 'hsl(285deg 10% 95%)',
  popoverForeground: 'hsl(285deg 10% 95%)',
  primaryForeground: 'hsl(285deg 10% 15%)',
  secondary: 'hsl(285deg 10% 27%)',
  secondaryForeground: 'hsl(285deg 10% 95%)',
  muted: 'hsl(285deg 10% 23%)',
  mutedForeground: 'hsl(285deg 10% 62%)',
  accent: 'hsl(285deg 10% 27%)',
  accentForeground: 'hsl(285deg 10% 95%)',

  destructive: 'hsl(359deg 94% 62%)',
  destructiveForeground: 'hsl(0deg 0% 98%)',

  input: 'hsl(285deg 10% 27%)',

  colorZinc400: 'hsl(240deg 5% 64%)',
  colorZinc500: 'hsl(240deg 4% 46%)',
  colorZinc600: 'hsl(240deg 6% 34%)',

  colorAuth: 'hsla(195deg 70% 70% / 0.6)',

  logoGlow: `
  0 0 0 1px hsla(0deg 0% 100% / 0.35),
  0 0 10px hsla(195deg 70% 70% / 0.55),
  0 0 22px hsla(195deg 70% 70% / 0.40),
  0 0 40px hsla(195deg 70% 70% / 0.18)
`,

  nav: {
    active: 'hsl(183deg 100% 50%)',
    inactive: 'hsl(240deg 5% 65%)',
  },
} as const;
