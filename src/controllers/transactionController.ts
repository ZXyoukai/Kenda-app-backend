import { Request, Response } from 'express';
import { TransactionService } from '../services/transactionService';

const transactionService = new TransactionService();

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Failed to create transaction' });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { userId, rideId, type, paymentMethod, startDate, endDate } = req.query;
    
    const filter: any = {};
    if (userId) filter.userId = userId as string;
    if (rideId) filter.rideId = rideId as string;
    if (type) filter.type = type as any;
    if (paymentMethod) filter.paymentMethod = paymentMethod as any;
    if (startDate) filter.startDate = new Date(startDate as string);
    if (endDate) filter.endDate = new Date(endDate as string);
    
    const transactions = await transactionService.getTransactions(filter);
    res.json(transactions);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.getTransactionById(id);
    
    if (!transaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    
    res.json(transaction);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTransactionByRideId = async (req: Request, res: Response) => {
  try {
    const { rideId } = req.params;
    const transaction = await transactionService.getTransactionByRideId(rideId);
    
    if (!transaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    
    res.json(transaction);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserTransactionTotal = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { type } = req.query;
    
    const total = await transactionService.getUserTransactionTotal(
      userId, 
      type as any
    );
    
    res.json({ total });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await transactionService.deleteTransaction(id);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Failed to delete transaction' });
  }
};
