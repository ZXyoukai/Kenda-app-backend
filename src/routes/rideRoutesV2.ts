import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import {
  createRide,
  getRides,
  getRideById,
  getPendingRides,
  acceptRide,
  startRide,
  completeRide,
  cancelRide,
  calculatePrice,
  updateRide,
  deleteRide
} from '../controllers/rideControllerV2';

const router = Router();

// Public routes
router.post('/calculate-price', calculatePrice);

// Authenticated routes
router.post('/', authenticate, createRide);
router.get('/', authenticate, getRides);
router.get('/pending', authenticate, getPendingRides);
router.get('/:id', authenticate, getRideById);
router.put('/:id', authenticate, updateRide);
router.delete('/:id', authenticate, deleteRide);

// Driver actions
router.post('/:id/accept', authenticate, acceptRide);
router.post('/:id/start', authenticate, startRide);
router.post('/:id/complete', authenticate, completeRide);
router.post('/:id/cancel', authenticate, cancelRide);

export default router;
