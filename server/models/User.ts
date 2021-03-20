import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';
// import { EXPIRATION_TIME } from '../config';

type UserType = 'investor' | 'startup';
export interface IUser extends Document {
  name: string;
  address: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
  avatarUrl: string;
  createdAt: Date;
  isVerified: boolean;
  whitePaper: string;
  userType: Array<UserType>;
  [x: string]: any;
}

export const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    address: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 100,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      maxLength: 100, // since hased password can be longer than our 50 length limit
    },
    bio: {
      type: String,
      minLength: 1,
      maxLength: 200,
      default: '404 bio not found!',
    },
    whitePaper: {
      type: String,
      minLength: 1,
      maxLength: 200,
      default: 'No white Paper!',
    },
    avatar: {
      type: mongoose.Types.ObjectId,
    },
    avatarUrl: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // auth
    userType: { type: [String], enum: ['investor', 'startup'], required: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.set('toJSON', {
  transform: function (_doc: any, ret: any) {
    ret.id = ret._id;
    delete ret.password;
    delete ret._id;
    delete ret.__v;
  },
});

UserSchema.pre('save', function (next) {
  // to only hash password when user signed up or update their password
  if (this.isModified('password') || this.isNew) {
    try {
      // Hash Password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync((this as IUser).password, salt);
      (this as IUser).password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return next();
  }
});

// UserSchema.index(
//   { createdAt: 1 },
//   {
//     expireAfterSeconds: EXPIRATION_TIME.NOT_VERIFIED_USER,
//     partialFilterExpression: {
//       isVerified: false,
//     },
//   }
// );

UserSchema.methods.isValidPassword = async function (password: string) {
  try {
    // Check/Compares password
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

// create the model
export const User = mongoose.model<IUser>('User', UserSchema);
