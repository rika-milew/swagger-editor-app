export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  HISTORY: '/history',
  ABOUT: '/about',
} as const;

export const AUTH_ROUTES = new Set<string>([ROUTES.SIGN_IN, ROUTES.SIGN_UP]);

export const PRIVATE_ROUTES = new Set<string>([ROUTES.HISTORY]);
