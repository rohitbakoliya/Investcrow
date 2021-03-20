import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { validateUserSignup } from '../validators/User.validators';
import httpStatus from 'http-status-codes';

export const signupErrorHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = validateUserSignup(req.body);
  if (error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });
  }
  // check for username or email conflicts
  try {
    const findWithEmail = await User.findOne({ email: value.email });
    if (findWithEmail) {
      return res.status(httpStatus.CONFLICT).json({ error: `Email Already Exists` });
    }
    return next();
  } catch (err) {
    return next(err);
  }
};
