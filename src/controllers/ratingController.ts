import { Request, Response } from 'express';
import { RatingService } from '../services/ratingService';

const ratingService = new RatingService();

export const createRating = async (req: Request, res: Response) => {
  try {
    const rating = await ratingService.createRating(req.body);
    res.status(201).json(rating);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed to create rating' });
  }
};

export const getRatingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rating = await ratingService.getRatingById(id);
    
    if (!rating) {
      res.status(404).json({ error: 'Rating not found' });
      return;
    }
    
    res.json(rating);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRatingByRideId = async (req: Request, res: Response) => {
  try {
    const { rideId } = req.params;
    const rating = await ratingService.getRatingByRideId(rideId);
    
    if (!rating) {
      res.status(404).json({ error: 'Rating not found' });
      return;
    }
    
    res.json(rating);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserRatings = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const ratings = await ratingService.getUserRatings(userId);
    res.json(ratings);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserAverageRating = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const average = await ratingService.getUserAverageRating(userId);
    res.json({ averageRating: average });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
