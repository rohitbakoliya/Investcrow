import { CLIENT_URL, SERVER_URL } from './siteUrls';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import { IUser } from '../models/User';
import { EmailToken, PasswordToken } from '../models/Token';

interface ISendEmail {
  user: IUser;
}

/**
 * to send user verification email
 * @param user mongo user ojbect
 */
export const sendVerificationMail = async ({ user }: ISendEmail): Promise<any> => {
  try {
    const token = await EmailToken.findOneAndUpdate(
      { _userId: user._id },
      {
        token: crypto.randomBytes(32).toString('hex'),
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true, // so no need to write userId along with new token
        useFindAndModify: false,
      }
    );
    if (!token) throw new Error(`Something went wrong while sending verification email`);

    // create verification link
    const verificationLink = `${SERVER_URL}/api/user/auth/verify-email/${token.token}`;
    const restoreVerificationLink = `${CLIENT_URL}/resend/verification-email`;

    const msg = {
      to: user.email,
      from: 'noreply.bugkira@gmail.com',
      subject: 'bugKira: Email Verification',
      templateId: 'd-2d409404966a41b3b874ac7b19ab3fbd',
      dynamic_template_data: {
        user: user.name,
        verification_link: verificationLink,
        restore_link_uri: restoreVerificationLink,
      },
    };

    await sgMail.send(msg);
    return Promise.resolve({ success: true });
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * to send password change email
 * @param user mongo user ojbect
 */
export const sendPasswordChangeMail = async ({ user }: ISendEmail): Promise<any> => {
  try {
    const token = await PasswordToken.findOneAndUpdate(
      { _userId: user._id },
      {
        token: crypto.randomBytes(32).toString('hex'),
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true, // so no need to write userId along with new token
        useFindAndModify: false,
      }
    );
    if (!token) throw new Error(`Something went wrong while sending password reset email`);

    // create password reset link
    const resetPasswordLink = `${CLIENT_URL}/reset-password/${token.token}`;
    const restoreVerificationLink = `${CLIENT_URL}/request/forgot-password`;

    const msg = {
      to: user.email,
      from: 'noreply.bugkira@gmail.com',
      subject: 'bugKira: Reset your password',
      templateId: 'd-eb4a9051797249d19b5dc07411466a65',
      dynamic_template_data: {
        user: user.name,
        reset_password_link: resetPasswordLink,
        restore_link_uri: restoreVerificationLink,
      },
    };

    await sgMail.send(msg);
    return Promise.resolve({ success: true });
  } catch (err) {
    return Promise.reject(err);
  }
};
