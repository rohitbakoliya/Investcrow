import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { CLIENT_URL, SERVER_URL } from '../config';
import { User, IUser } from '../models/User';
import { validateEmail, passwordValidator, validateUserLogin } from '../validators/User.validators';
import Joi from 'joi';
import { sendPasswordChangeMail, sendVerificationMail } from '../config/mailer';
import { EmailToken, PasswordToken } from '../models/Token';

/**
 * @desc    To check authentication status
 * @route   GET /api/user/auth/portis
 * @access  private
 */
export const storeAccount = async (req: Request, res: Response) => {
  try {
    const account = req.body.account;
    const user = await User.findOne({ _id: (req.user as IUser).id });
    if (!user) return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
    user.address = account;
    await user.save();
    return res
      .status(httpStatus.OK)
      .json({ data: { account: user.address }, message: 'Portis login successfull' });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Something went wrong',
    });
  }
};

/**
 * @desc    To check authentication status
 * @route   GET /api/user/auth/check-auth
 * @access  private
 */

export const checkAuth = (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ data: req.user });
};

/**
 * @desc    to logout current user
 * @route   GET /api/auth/user/logout
 * @access  private
 */
export const logout = (req: Request, res: Response) => {
  req.logOut();
  res.status(httpStatus.OK).clearCookie('jwt').json({ data: 'logged out successfully!' });
};

/**
 * @desc    to signup user
 * @route   POST /api/auth/user/signup
 * @access  public
 */
export const signup = async (req: Request, res: Response) => {
  const { body } = req;
  console.log(body);
  // * profile is required for now
  if (!req.file) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'Please Select An Image' });
  }
  // 1) save user in db
  // 2) send user verification email email
  try {
    // create new user for sign up
    // as all possible conflicts already checked in the `signupErrorHandler` middleware
    const newUser = new User({
      name: body.name,
      email: body.email,
      password: body.password,
      avatar: req.file.id,
      userType: [req.body.userType],
    });
    const savedUser = await newUser.save();
    const avatarUrl = `${SERVER_URL}/api/user/${savedUser.id}/avatar/raw`;

    savedUser.avatarUrl = avatarUrl;
    await savedUser.save();
    // send user verification email
    // and no need to wait here
    // sendVerificationMail({ user: savedUser });

    const data = {
      isVerified: savedUser.isVerified,
      avatarUrl: savedUser.avatarUrl,
      id: savedUser.id,
      email: savedUser.email,
      address: savedUser.address,
      name: savedUser.name,
    };
    const token = jwt.sign(data, process.env.JWT_TOKEN_SECRET!, { expiresIn: '2h' });

    return res.cookie('jwt', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }).send({ data });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'something went wrong' });
  }
};

/**
 * @desc    to login user
 * @route   POST /api/user/auth/login
 * @access  public
 */
export const login = async (req: Request, res: Response) => {
  const { error, value } = validateUserLogin(req.body);
  if (error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });
  }
  try {
    // check if user exist
    let user: any = {};
    const findUser = await User.findOne({ email: value.email });
    if (!findUser) return res.status(httpStatus.NOT_FOUND).json({ error: 'Email does not exists' });

    user = findUser;

    // make sure email is verified
    // if (!user.isVerified)
    //   return res.status(httpStatus.FORBIDDEN).json({ error: 'Email not verified' });

    // user only signed up with google
    // if (!user.password || !user.provider.includes('local')) {
    //   return res.status(httpStatus.NOT_FOUND).json({
    //     error: 'Unknown auth method, Try logging in with Google',
    //   });
    // }

    // Check/Compares password
    const validPassword = await user.isValidPassword(value.password);
    if (!validPassword)
      return res.status(httpStatus.FORBIDDEN).json({ error: 'Password is incorrect' });

    // valid user so create jwt token
    const token = jwt.sign(
      {
        isVerified: user.isVerified,
        address: user.address,
        userType: user.userType,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        id: user.id,
      },
      process.env.JWT_TOKEN_SECRET!,
      { expiresIn: '2h' }
    );

    return res
      .status(httpStatus.OK)
      .cookie('jwt', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true })
      .send({
        data: {
          isVerified: user.isVerified,
          address: user.address,
          userType: user.userType,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
          id: user.id,
          bio: user.bio,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt,
        },
      });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'something went wrong' });
  }
};

/**
 * @desc    to verify email using token
 * @route   GET /api/user/auth/verify-email/:token
 * @access  public
 */
export const verifyEmail = async (req: Request, res: Response) => {
  // @improve: notify frontend about the verifcation success or error
  try {
    const verificationToken = req.params.token as string;
    if (!verificationToken)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: `Email verification link is broken` });

    // finding token
    const token = await EmailToken.findOne({ token: verificationToken });
    if (!token)
      return res.status(httpStatus.NOT_FOUND).json({ error: 'Unable to find verification token' });

    // find user corrosponding to token
    const user = await User.findOne({ _id: token._userId });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: `Unable to find user associated with your email` });
    }
    if (user.isVerified)
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Email is already verified' });

    // now verify user account
    user.isVerified = true;
    // ! may need to set `user.expires = null`
    const savedUser = await user.save();
    if (!savedUser)
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Error while verifying user' });

    return res.status(httpStatus.OK).redirect(CLIENT_URL);
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: `something went wrong while verifying your email` });
  }
};

/**
 * @desc    to update current user's password
 * @route   PATCH /api/user/auth/update-password/
 * @access  private
 */
export const updatePassword = async (req: Request, res: Response) => {
  const {
    value: { oldPassword, newPassword },
    error,
  } = Joi.object({
    oldPassword: passwordValidator,
    newPassword: passwordValidator,
    confirmPassword: passwordValidator.valid(Joi.ref('newPassword')),
  }).validate(req.body);
  if (error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });
  }
  try {
    const user = await User.findById((req.user as any).id);
    if (!user) return res.status(httpStatus.NOT_FOUND).json({ error: `user doesn't exists` });

    // check wether provided oldPassword is correct or not
    const validPassword = await user.isValidPassword(oldPassword);
    if (!validPassword)
      return res.status(httpStatus.FORBIDDEN).json({ error: 'Incorrect old password' });

    // new password is same as old one
    if (newPassword === oldPassword)
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ error: `New Password cannot be same as old password0` });

    // if all good then update current password to new one
    user.password = newPassword;

    await user.save();
    return res.status(httpStatus.OK).json({ data: 'Password updated successfully' });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'something went wrong' });
  }
};

/**
 * @desc    to change user password usign reset password link
 * @route   PATCH /api/user/auth/reset-password/:token
 * @access  public
 */
export const resetPassword = async (req: Request, res: Response) => {
  const {
    value: { password },
    error,
  } = Joi.object({
    password: passwordValidator,
    confirmPassword: passwordValidator.valid(Joi.ref('password')),
  }).validate(req.body);
  if (error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });
  }

  try {
    const verificationToken = req.params.token as string;
    if (!verificationToken)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: `Unable to find verification token` });
    // finding token
    const token = await PasswordToken.findOne({ token: verificationToken });
    if (!token)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: 'Password reset link is either expired or invalid' });

    // find user corrosponding to token
    const user = await User.findOne({ _id: token._userId });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: `Unable to find user associated with your email` });
    }
    // if email is not verified
    if (!user.isVerified)
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Email is not verified' });

    // if all good then update current password to new one
    user.password = password;
    await user.save();
    await token.delete();
    return res.status(httpStatus.OK).json({ data: 'Password updated successfully' });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: `something went wrong while changing your password` });
  }
};

/**
 * @desc    for resending email verification link
 * @route   POST /api/user/auth/request/verification-email
 * @access  public
 */
export const requestEmailVerification = async (req: Request, res: Response) => {
  const { value: email, error } = validateEmail(req.body.email);

  if (error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });
  }
  try {
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: `Unable to find user associated with your email` });
    }
    // user is already verified
    if (user.isVerified)
      return res.status(httpStatus.FORBIDDEN).json({ error: `Email is already verified` });

    // send user verification email
    // and wait until email has been sent
    await sendVerificationMail({ user });
    return res
      .status(httpStatus.OK)
      .json({ data: `A verification email was sent to ${user.email}` });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: `something went wrong while sending you a email` });
  }
};

/**
 * @desc    for password reset link
 * @route   POST /api/user/auth/request/reset-password
 * @access  public
 */
export const requestPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
  const { value: email, error } = validateEmail(req.body.email);
  if (error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });
  }
  try {
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: `Unable to find user associated with your email` });
    }
    // if user is not verified
    if (!user.isVerified)
      return res.status(httpStatus.FORBIDDEN).json({ error: `Email is not verified` });

    // send password reset email
    await sendPasswordChangeMail({ user });

    return res
      .status(httpStatus.OK)
      .json({ data: `An email containing password reset instructions was sent to ${email}` });
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return next(err);
    }
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: `something went wrong while sending you a email` });
  }
};
