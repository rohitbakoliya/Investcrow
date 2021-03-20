import { Request } from 'express';
import multer, { FileFilterCallback, MulterError } from 'multer';
import crypto from 'crypto';
import path from 'path';
import GridFsStorage from 'multer-gridfs-storage';

// GridFS storage engine for Multer to store uploaded files directly to MongoDb.
const storage = new GridFsStorage({
  url: process.env.MONGO_URI!,
  options: { useUnifiedTopology: true },
  file: (_req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'images',
        };
        resolve(fileInfo);
      });
    });
  },
});

const fileFilter = (_req: Request, file: any, cb: FileFilterCallback) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // if file is not with correct image mimetypes
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', file));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

export default upload;
