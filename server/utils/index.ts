import { Request } from 'express';

export const genUsernameFromEmail = (email: string) => {
  return email.match(/([^@]+)/)![0];
};

export const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }
  return token;
};
