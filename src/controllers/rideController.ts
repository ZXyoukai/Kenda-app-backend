import { Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middlewares/authMiddleware';
import { calculatePrice, notifyNewRide, notifyRideUpdate } from '../services/rideService';
import { RideStatus } from '@prisma/client';

export const requestRide = async (req: AuthRequest, res: Response) => {
  try {
    const passengerId = req.user?.id;
    if (!passengerId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const {
      originLat, originLng, originAddress,
      destLat, destLng, destAddress,
      type, cargoDescription, cargoWeight, cargoDimensions,
      scheduledAt
    } = req.body;

    // Mock distance/duration calculation (In real app, use Google Maps API or OSRM)
    // Calculating straight line distance for estimation (Haversine formula simplified or just mock)
    const distanceKm = Math.sqrt(Math.pow(destLat - originLat, 2) + Math.pow(destLng - originLng, 2)) * 111; // Rough approx
    const durationMin = distanceKm * 3; // Rough approx 20km/h avg in city

    const estimatedPrice = calculatePrice(distanceKm, durationMin, type || 'PERSON');

    const ride = await prisma.ride.create({
      data: {
        passengerId,
        originLat, originLng, originAddress,
        destLat, destLng, destAddress,
        type: type || 'PERSON',
        status: 'PENDING',
        estimatedPrice,
        distanceKm,
        durationMin,
        cargoDescription,
        cargoWeight,
        cargoDimensions,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null
      }
    });

    notifyNewRide(ride);

    res.status(201).json(ride);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNearbyRides = async (req: AuthRequest, res: Response) => {
  try {
    // In a real app, use PostGIS or geospatial query to find rides near driver's location
    // For MVP, return all PENDING rides
    const rides = await prisma.ride.findMany({
      where: {
        status: 'PENDING',
        driverId: null
      },
      include: {
        passenger: {
          select: { name: true, avatarUrl: true } // Assuming rating is calculated or stored
        }
      }
    });

    res.json(rides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const acceptRide = async (req: AuthRequest, res: Response) => {
  try {
    const driverId = req.user?.id;
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'Ride ID is required' });
      return;
    }

    if (!driverId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Check if user is a driver
    if (req.user?.role !== 'DRIVER') {
      res.status(403).json({ error: 'Only drivers can accept rides' });
      return;
    }

    const ride = await prisma.ride.findUnique({ where: { id } });

    if (!ride) {
      res.status(404).json({ error: 'Ride not found' });
      return;
    }

    if (ride.status !== 'PENDING') {
      res.status(400).json({ error: 'Ride already accepted or cancelled' });
      return;
    }

    const updatedRide = await prisma.ride.update({
      where: { id },
      data: {
        driverId,
        status: 'ACCEPTED'
      },
      include: {
        passenger: { select: { id: true, name: true, phone: true } },
        driver: { select: { id: true, name: true, phone: true, vehicleModel: true, vehiclePlate: true } }
      }
    });

    notifyRideUpdate(updatedRide);

    res.json(updatedRide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateRideStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // IN_PROGRESS, COMPLETED, CANCELLED

    if (!id) {
      res.status(400).json({ error: 'Ride ID is required' });
      return;
    }

    const ride = await prisma.ride.findUnique({ where: { id } });

    if (!ride) {
      res.status(404).json({ error: 'Ride not found' });
      return;
    }

    // Validate transitions
    // ...

    const dataToUpdate: any = { status };
    if (status === 'IN_PROGRESS') dataToUpdate.startedAt = new Date();
    if (status === 'COMPLETED') {
      dataToUpdate.completedAt = new Date();
      dataToUpdate.finalPrice = ride.estimatedPrice; // Or recalculate based on actuals
    }

    const updatedRide = await prisma.ride.update({
      where: { id },
      data: dataToUpdate
    });

    notifyRideUpdate(updatedRide);

    res.json(updatedRide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
