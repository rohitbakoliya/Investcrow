import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import sharp from 'sharp';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import axios from 'axios';
import { memCache } from '../middlewares/cache';
import { IUser, User } from '../models/User';

// Initialize GridFS Stream
// The stream is needed to read the files from the database and also to help render an image to a browser when needed
let gfs: GridFSBucket;
mongoose.connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'images',
  });
});

const removeFile = (id: any) => {
  gfs.delete(id, () => {
    console.log('Removed Old User Image:', id);
  });
};

/**
 * @desc    upload profile picture of user
 * @route   PATCH /api/user/me/avatar/upload
 * @access  private
 */
export const updateProfileImage = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: (req.user as IUser).id });
    if (!user) return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });

    // if user avatar is already exists then delete the
    // old image and upload new
    if (user.avatar) {
      removeFile(user.avatar);
    }
    user.avatar = req.file.id;
    await user.save();

    return res
      .status(httpStatus.OK)
      .json({ data: user.avatar, message: 'Profile picture updated' });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Something went wrong',
    });
  }
};

/**
 * @desc    current user avatar
 * @route   GET /api/user/me/avatar
 * @access  private
 */
export const getCurrentUserAvatar = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: (req.user as IUser).username });
    if (!user) return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found!' });

    const avatars = await gfs.find({ _id: user.avatar });
    avatars.toArray((_err, files) => {
      if (!files || files.length === 0) {
        return res.status(httpStatus.NOT_FOUND).json({ error: 'Image not found' });
      }
      return res.status(httpStatus.OK).json({ data: files[0] });
    });
    return;
  } catch (err) {
    // console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Something went wrong',
    });
  }
};

/**
 * @desc    avatar of user by username
 * @route   GET /api/user/:id/avatar
 * @access  private
 */
export const getAvatarImageByUsername = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });

    const avatars = await gfs.find({ _id: user.avatar });
    avatars.toArray((_err, files) => {
      if (!files || files.length === 0) {
        return res.status(httpStatus.NOT_FOUND).json({ error: 'Image not found' });
      }
      return res.status(httpStatus.OK).json({ data: files[0] });
    });
    return;
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: `something went wrong` });
  }
};

/**
 * @desc    raw avatar of user by username
 * @route   GET /api/user/:id/avatar/raw
 * @access  private
 */
export const getRawAvatarImageByUsername = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const cacheUrl = req.originalUrl || req.url;

    const user = await User.findById(id).select('-password');
    if (!user) return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });

    // ! need to check if user signed up with o-auth then only allow google profile picture
    // ! i.e user can't update their profile picture
    // if user found
    // then check whether user has avatar or not
    if (!user.avatar) {
      axios
        .request({ url: user.avatarUrl, responseType: 'arraybuffer' })
        .then(buffer => {
          res.setHeader('content-type', buffer.headers['content-type']);
          res.setHeader('content-length', buffer.headers['content-length']);
          res.setHeader('cache-control', buffer.headers['cache-control']);
          return res.status(httpStatus.OK).send(buffer.data);
        })
        .catch(() =>
          res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: `something went wrong` })
        );
    } else {
      // check for cached avatar
      console.log(`check for cached avatar`);
      memCache.get(cacheUrl, async (cachedData: any) => {
        // if avatar is in the cache
        if (cachedData) {
          return res.send(cachedData);
        } else {
          console.log(`avatar is not in cache`);
          const avatars = await gfs.find({ _id: user.avatar });

          avatars.toArray((_err, files) => {
            if (!files || files.length === 0) {
              return res.status(httpStatus.NOT_FOUND).json({ error: `Image not found` });
            }
            const file = files[0];
            const fileType = file.contentType;
            res.header('Content-Type', fileType);
            res.header('Content-Length', file.length);

            // resize img
            let size = 200;
            if (req.query.size) {
              size = parseInt(req.query.size as string);
            }
            if (size > 500) size = 500;
            const chunks: Buffer[] = [];
            return gfs
              .openDownloadStream(file._id)
              .on('data', chunk => chunks.push(chunk))
              .on('end', () => {
                const buffer = Buffer.concat(chunks);

                // resizing profile picture using sharp
                sharp(buffer)
                  .resize(size, size)
                  .jpeg({ quality: 100 })
                  .toBuffer((err, resizedBuffer) => {
                    try {
                      if (err || !resizedBuffer) throw Error(err.message);
                      res.status(httpStatus.OK).send(resizedBuffer);
                      memCache.set(cacheUrl, resizedBuffer);
                    } catch (err) {
                      res
                        .status(httpStatus.INTERNAL_SERVER_ERROR)
                        .json({ error: `something went wrong` });
                    }
                  });
              });
          });
          return null;
        }
      });
    }
    return;
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: `something went wrong` });
  }
};
