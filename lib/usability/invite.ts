import { createHash, randomBytes } from 'crypto';

const TOKEN_BYTES = 32;

/** Generate a URL-safe session token for magic links. */
export function generateSessionToken(): string {
  return randomBytes(TOKEN_BYTES).toString('base64url');
}

/** Optional: hash token for storage if you ever want to store only hashes. Not used in v1. */
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}
