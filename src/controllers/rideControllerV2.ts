import { Request, Response } from 'express';
import { RideServiceV2 } from '../services/rideServiceV2';
import { AuthRequest } from '../middlewares/authMiddleware';

const rideService = new RideServiceV2();

export const createRide = async (req: AuthRequest, res: Response) => {
  try {
    const passengerId = req.user?.id;
    const rideData = { ...req.body, passengerId };
    
    const ride = await rideService.createRide(rideData);
    res.status(201).json(ride);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Failed to create ride' });
  }
};

export const getRides = async (req: Request, res: Response) => {
  try {
    const { passengerId, driverId, status, type, startDate, endDate } = req.query;
    
    const filter: any = {};
    if (passengerId) filter.passengerId = passengerId as string;
    if (driverId) filter.driverId = driverId as string;
    if (status) filter.status = status as any;
    if (type) filter.type = type as any;
    if (startDate) filter.startDate = new Date(startDate as string);
    if (endDate) filter.endDate = new Date(endDate as string);
    
    const rides = await rideService.getRides(filter);
    res.json(rides);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRideById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ride = await rideService.getRideById(id);
    
    if (!ride) {
      res.status(404).json({ error: 'Ride not found' });
      return;
    }
    
    res.json(ride);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPendingRides = async (req: Request, res: Response) => {
  try {
    const rides = await rideService.getPendingRides();
    res.json(rides);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const acceptRide = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const driverId = req.user?.id;
    
    if (req.user?.role !== 'DRIVER') {
      res.status(403).json({ error: 'Only drivers can accept rides' });
      return;
    }
    
    const ride = await rideService.acceptRide(id, driverId!);
    res.json(ride);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Failed to accept ride' });
  }
};

export const startRide = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ride = await rideService.startRide(id);
    res.json(ride);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Failed to start ride' });
  }
};

export const completeRide = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { finalPrice, distanceKm, durationMin, paymentMethod } = req.body;
    
    const ride = await rideService.completeRide(id, finalPrice, distanceKm, durationMin, paymentMethod);
    res.json(ride);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Failed to complete ride' });
  }
};

export const cancelRide = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ride = await rideService.cancelRide(id);
    res.json(ride);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Failed to cancel ride' });
  }
};

export const calculatePrice = async (req: Request, res: Response) => {
  try {
    const { distanceKm, durationMin, type } = req.body;
    const price = rideService.calculatePrice(distanceKm, durationMin, type);
    res.json({ estimatedPrice: price });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to calculate price' });
  }
};

export const updateRide = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ride = await rideService.updateRide(id, req.body);
    res.json(ride);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Failed to update ride' });
  }
};

export const deleteRide = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await rideService.deleteRide(id);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Failed to delete ride' });
  }
};

// Legacy aliases for backward compatibility
export const requestRide = createRide;
export const getNearbyRides = getPendingRides;
export const updateRideStatus = updateRide;
