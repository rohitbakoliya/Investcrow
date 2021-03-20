import passport from 'passport';
import httpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export const passportJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Unauthorized user' });
    req.user = user;
    next();
  })(req, res, next);
};
