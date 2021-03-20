import express from 'express';
import { passportJWT } from '../middlewares/passportJWT';
import {
  getAvatarImageByUsername,
  getRawAvatarImageByUsername,
  getCurrentUserAvatar,
  updateProfileImage,
} from '../controllers/image.controller';
import upload from '../middlewares/fileUpload';

const avatarUpload = upload.single('image');

const router = express.Router();

router.get('/me/avatar', passportJWT, getCurrentUserAvatar);

router.patch('/me/avatar/upload', passportJWT, avatarUpload, updateProfileImage);

router.get('/:id/avatar', passportJWT, getAvatarImageByUsername);

router.get('/:id/avatar/raw', passportJWT, getRawAvatarImageByUsername);

export default router;
