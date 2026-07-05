export const databaseErrorMap: Record<string, string> = {
  invalid_credentials: 'Auth.serverErrors.invalidCredentials',
  invalid_email: 'Auth.serverErrors.invalidEmail',
  user_not_found: 'Auth.serverErrors.invalidCredentials',
  user_already_exists: 'Auth.serverErrors.emailTaken',
  email_taken: 'Auth.serverErrors.emailTaken',
  weak_password: 'Auth.serverErrors.weakPassword',
  over_request_rate_limit: 'Auth.serverErrors.tooManyRequests',
  session_expired: 'Auth.serverErrors.sessionExpired',
};

export function getDatabaseErrorKey(error: {
  code?: string;
  message?: string;
}): string {
  if (error.code && databaseErrorMap[error.code]) {
    return databaseErrorMap[error.code];
  }
  return error.message ?? 'Auth.serverErrors.default';
}
