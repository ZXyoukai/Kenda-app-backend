import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import {
  createRating,
  getRatingById,
  getRatingByRideId,
  getUserRatings,
  getUserAverageRating
} from '../controllers/ratingController';

const router = Router();

// All routes require authentication
router.post('/', authenticate, createRating);
router.get('/:id', authenticate, getRatingById);
router.get('/ride/:rideId', authenticate, getRatingByRideId);
router.get('/user/:userId', authenticate, getUserRatings);
router.get('/user/:userId/average', authenticate, getUserAverageRating);

export default router;
