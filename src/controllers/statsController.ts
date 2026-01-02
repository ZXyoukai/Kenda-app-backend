import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { StatsService } from '../services/statsService';

const statsService = new StatsService();

export const getUserStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const stats = await statsService.getUserStats(userId);
    res.json(stats);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getDriverStats = async (req: Request, res: Response) => {
  try {
    const { driverId } = req.params;
    const stats = await statsService.getDriverStats(driverId);
    
    if (!stats) {
      res.status(404).json({ error: 'Driver not found' });
      return;
    }

    res.json(stats);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSystemStats = async (req: AuthRequest, res: Response) => {
  try {
    // Verificar se é admin
    if (req.user?.role !== 'ADMIN') {
      res.status(403).json({ error: 'Access denied - Admin only' });
      return;
    }

    const stats = await statsService.getSystemStats();
    res.json(stats);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
