import { Request, Response } from 'express';
import { DriverService } from '../services/driverService';

const driverService = new DriverService();

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const profile = await driverService.getProfile(userId!);
    
    if (!profile) {
      res.status(404).json({ error: 'Driver not found' });
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
    const profile = await driverService.updateProfile(userId!, req.body);
    res.json(profile);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await driverService.getAllDrivers();
    res.json(drivers);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOnlineDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await driverService.getOnlineDrivers();
    res.json(drivers);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getDriverById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const driver = await driverService.getProfile(id);
    
    if (!driver) {
      res.status(404).json({ error: 'Driver not found' });
      return;
    }

    res.json(driver);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { lat, lng } = req.body;
    await driverService.updateLocation(userId!, lat, lng);
    res.json({ message: 'Location updated successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const setOnlineStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { isOnline } = req.body;
    const driver = await driverService.setOnlineStatus(userId!, isOnline);
    res.json(driver);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteDriver = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await driverService.deleteDriver(id);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
