import { Router } from 'express';
import { requestRide, getNearbyRides, acceptRide, updateRideStatus } from '../controllers/rideController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/request', requestRide);
router.get('/nearby', getNearbyRides);
router.patch('/:id/accept', acceptRide);
router.patch('/:id/status', updateRideStatus);

export default router;
