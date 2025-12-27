import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  getTransactionByRideId,
  getUserTransactionTotal,
  deleteTransaction
} from '../controllers/transactionController';

const router = Router();

// All routes require authentication
router.post('/', authenticate, createTransaction);
router.get('/', authenticate, getTransactions);
router.get('/:id', authenticate, getTransactionById);
router.get('/ride/:rideId', authenticate, getTransactionByRideId);
router.get('/user/:userId/total', authenticate, getUserTransactionTotal);
router.delete('/:id', authenticate, deleteTransaction);

export default router;
