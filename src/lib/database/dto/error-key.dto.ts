export const databaseErrorMap: Record<string, string> = {
  invalid_credentials: 'serverErrors.invalidCredentials',
  invalid_grant: 'serverErrors.invalidCredentials',
  invalid_email: 'serverErrors.invalidEmail',
  email_address_invalid: 'serverErrors.invalidEmail',
  user_not_found: 'serverErrors.invalidCredentials',
  user_already_exists: 'serverErrors.emailTaken',
  email_taken: 'serverErrors.emailTaken',
  email_exists: 'serverErrors.emailTaken',
  weak_password: 'serverErrors.weakPassword',
  over_request_rate_limit: 'serverErrors.tooManyRequests',
  session_expired: 'serverErrors.sessionExpired',
  session_not_found: 'serverErrors.sessionExpired',
  auth_error: 'serverErrors.default',
  unexpected_error: 'serverErrors.default',
};

export function toErrorKeyDTO(error: {
  code?: string;
  message?: string;
}): string {
  if (error.code && databaseErrorMap[error.code]) {
    return databaseErrorMap[error.code];
  }
  return error.message ?? 'serverErrors.default';
}
