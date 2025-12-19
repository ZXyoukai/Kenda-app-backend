import { RideType } from '@prisma/client';
import { getIO } from '../socket';

export const calculatePrice = (distanceKm: number, durationMin: number, type: RideType): number => {
  const basePrice = type === 'CARGO' ? 10.0 : 5.0;
  const pricePerKm = type === 'CARGO' ? 2.0 : 1.5;
  const pricePerMin = 0.5;

  const total = basePrice + (distanceKm * pricePerKm) + (durationMin * pricePerMin);
  return parseFloat(total.toFixed(2));
};

export const notifyNewRide = (ride: any) => {
  const io = getIO();
  // Broadcast to all drivers or specific room
  // In a real app, you'd filter by location (Geospatial query)
  io.emit('newRideAvailable', ride);
};

export const notifyRideUpdate = (ride: any) => {
  const io = getIO();
  // Notify the passenger specifically
  io.to(ride.passengerId).emit('rideStatusUpdated', ride);
  
  // Also notify the driver if assigned
  if (ride.driverId) {
    io.to(ride.driverId).emit('rideStatusUpdated', ride);
  }
};
