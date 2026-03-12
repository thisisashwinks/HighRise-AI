/** Only employees with this email domain can sign up and upload. */
export const ALLOWED_EMPLOYEE_EMAIL_SUFFIX = '@gohighlevel.com';

export function isAllowedEmployeeEmail(email: string): boolean {
  return typeof email === 'string' && email.trim().toLowerCase().endsWith(ALLOWED_EMPLOYEE_EMAIL_SUFFIX);
}
