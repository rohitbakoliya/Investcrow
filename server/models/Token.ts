import mongoose, { Document } from 'mongoose';
import { EXPIRATION_TIME } from '../config';

export interface IEmailToken extends Document {
  _userId: string;
  token: string;
  [x: string]: any;
}
export type IPasswordToken = IEmailToken;

const EmailTokenSchema = new mongoose.Schema<IEmailToken>(
  {
    _userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

EmailTokenSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: EXPIRATION_TIME.VERIFICATION_EMAIL_TOKEN,
  }
);

const PasswordTokenSchema = new mongoose.Schema<IPasswordToken>(
  {
    _userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

PasswordTokenSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: EXPIRATION_TIME.PASSWORD_CHANGE_TOKEN,
  }
);

export const EmailToken = mongoose.model<IEmailToken>('EmailToken', EmailTokenSchema);
export const PasswordToken = mongoose.model<IPasswordToken>('PasswordToken', PasswordTokenSchema);
