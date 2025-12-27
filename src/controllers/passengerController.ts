import { Request, Response } from 'express';
import { PassengerService } from '../services/passengerService';

const passengerService = new PassengerService();

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const profile = await passengerService.getProfile(userId!);
    
    if (!profile) {
      res.status(404).json({ error: 'Passenger not found' });
      return;
    }

    res.json(profile);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const profile = await passengerService.updateProfile(userId!, req.body);
    res.json(profile);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllPassengers = async (req: Request, res: Response) => {
  try {
    const passengers = await passengerService.getAllPassengers();
    res.json(passengers);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPassengerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const passenger = await passengerService.getProfile(id);
    
    if (!passenger) {
      res.status(404).json({ error: 'Passenger not found' });
      return;
    }

    res.json(passenger);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deletePassenger = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await passengerService.deletePassenger(id);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
