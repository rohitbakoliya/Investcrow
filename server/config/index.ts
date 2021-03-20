// in seconds
export const EXPIRATION_TIME = {
  JWT_TOKEN: 2 * 60 * 60,
  VERIFICATION_EMAIL_TOKEN: 3 * 60 * 60,
  PASSWORD_CHANGE_TOKEN: 30 * 60,
  NOT_VERIFIED_USER: 2 * 60 * 60,
};

export * from './siteUrls';
