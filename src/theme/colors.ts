export const colors = {
  colorWhite: 'hsl(0deg 0% 100%)',

  background: 'hsl(240deg 10% 4%)',
  border: 'hsl(240deg 5% 16%)',
  textPrimary: 'hsl(240deg 9% 4%)',

  brandPrimary: 'hsl(195deg 70% 70%)',
  brandSecondary: 'hsl(305deg 60% 65%)',

  methodGet: 'hsl(145deg 60% 60%)',
  methodPost: 'hsl(80deg 70% 65%)',
  methodPut: 'hsl(240deg 60% 65%)',
  methodDelete: 'hsl(25deg 70% 60%)',

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

  destructive: 'hsl(25deg 70% 60%)',
  destructiveForeground: 'hsl(0deg 0% 98%)',

  input: 'hsl(285deg 10% 27%)',

  colorZinc600: 'hsl(240deg 3% 44%)',

  colorAuth: 'hsla(195deg 70% 70% / 0.6)',

  logoGlow: `
  0 0 0 1px hsla(0deg 0% 100% / 0.35),
  0 0 10px hsla(195deg 70% 70% / 0.55),
  0 0 22px hsla(195deg 70% 70% / 0.40),
  0 0 40px hsla(195deg 70% 70% / 0.18)
`,

  nav: {
    active: 'hsl(0deg 0% 100%)',
    inactive: 'hsl(240deg 5% 65%)',
  },
} as const;
