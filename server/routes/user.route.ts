import express from 'express';
import {
  getUserFromUsername,
  getCurrentUser,
  updateBio,
  updateName,
  updateWp,
  getAllInvestors,
  getAllStartups,
  getAllUser,
} from '../controllers/user.controller';
import { passportJWT } from '../middlewares/passportJWT';

const router = express.Router();
// const passportJWT = passport.authenticate('jwt', { session: false });

router.get('/startups', getAllStartups);
router.get('/investors', getAllInvestors);
router.get('/all', getAllUser);

router.get('/me', passportJWT, getCurrentUser);
router.patch('/me/bio', passportJWT, updateBio);
router.patch('/me/wp', passportJWT, updateWp);
router.patch('/me/name', passportJWT, updateName);

router.get('/:address', passportJWT, getUserFromUsername);

export default router;
