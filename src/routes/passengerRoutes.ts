import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import {
  getProfile,
  updateProfile,
  getAllPassengers,
  getPassengerById,
  deletePassenger
} from '../controllers/passengerController';

const router = Router();

// Passenger routes (authenticated)
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

// Admin routes (for managing passengers)
router.get('/', authenticate, getAllPassengers);
router.get('/:id', authenticate, getPassengerById);
router.delete('/:id', authenticate, deletePassenger);

export default router;
