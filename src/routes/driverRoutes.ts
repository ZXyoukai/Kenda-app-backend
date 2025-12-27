import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import {
  getProfile,
  updateProfile,
  getAllDrivers,
  getOnlineDrivers,
  getDriverById,
  updateLocation,
  setOnlineStatus,
  deleteDriver
} from '../controllers/driverController';

const router = Router();

// Driver routes (authenticated)
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.put('/location', authenticate, updateLocation);
router.put('/status', authenticate, setOnlineStatus);

// Public/Admin routes
router.get('/', getAllDrivers);
router.get('/online', getOnlineDrivers);
router.get('/:id', getDriverById);
router.delete('/:id', authenticate, deleteDriver);

export default router;
