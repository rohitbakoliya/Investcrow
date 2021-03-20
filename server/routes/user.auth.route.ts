import express from 'express';
// import passport from 'passport';
// import { CLIENT_URL } from '../config';
// import { generateToken } from '../middlewares/generateToken';
import {
  checkAuth,
  login,
  logout,
  requestEmailVerification,
  requestPasswordReset,
  resetPassword,
  signup,
  storeAccount,
  updatePassword,
  verifyEmail,
} from '../controllers/user.auth.controller';
import { passportJWT } from '../middlewares/passportJWT';
import { signupErrorHandler } from '../middlewares/authErrorHandler';

import upload from '../middlewares/fileUpload';
import rateLimit from 'express-rate-limit';

const router = express.Router();
const avatarUpload = upload.single('image');

// const passportGoogle = passport.authenticate('google', {
//   session: false,
//   failureRedirect: CLIENT_URL,
// });

// /**
//  * @desc    Auth with google
//  * @route   GET /api/user/auth/google
//  * @access  public
//  */
// router.get(
//   '/google',
//   passport.authenticate('google', { session: false, scope: ['profile', 'email'] })
// );

// /**
//  * @desc    Google auth callback
//  * @route   GET /api/user/auth/google
//  * @access  public
//  */
// router.get('/google/callback', passportGoogle, generateToken);

router.get('/check-auth', passportJWT, checkAuth);
router.post('/portis', passportJWT, storeAccount);

router.post('/login', login);

router.get('/logout', passportJWT, logout);

router.post('/signup', avatarUpload, signupErrorHandler, signup);

router.get('/verify-email/:token', verifyEmail);

router.patch('/reset-password/:token', resetPassword);

router.patch('/update-password', passportJWT, updatePassword);

const emailSendingRateLimit = rateLimit({
  windowMs: 12 * 60 * 60 * 1000, // 12h
  max: 5,
});

router.post('/request/reset-password', emailSendingRateLimit, requestPasswordReset);

router.post('/request/verification-email', emailSendingRateLimit, requestEmailVerification);

export default router;
