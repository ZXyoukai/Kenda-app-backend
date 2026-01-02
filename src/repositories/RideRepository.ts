import { Ride, RideStatus, Prisma } from '@prisma/client';
import prisma from '../prisma';

export class RideRepository {
  async create(data: Prisma.RideCreateInput): Promise<Ride> {
    return await prisma.ride.create({ data });
  }

  async findById(id: string): Promise<Ride | null> {
    return await prisma.ride.findUnique({
      where: { id },
      include: {
        passenger: {
          select: {
            id: true,
            name: true,
            phone: true,
            avatarUrl: true,
          },
        },
        driver: {
          select: {
            id: true,
            name: true,
            phone: true,
            avatarUrl: true,
            vehicleModel: true,
            vehiclePlate: true,
          },
        },
        ratings: true,
        transaction: true,
      },
    });
  }

  async findAll(filter?: {
    passengerId?: string;
    driverId?: string;
    status?: RideStatus;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Ride[]> {
    const where: Prisma.RideWhereInput = {};

    if (filter?.passengerId) where.passengerId = filter.passengerId;
    if (filter?.driverId) where.driverId = filter.driverId;
    if (filter?.status) where.status = filter.status;
    if (filter?.startDate || filter?.endDate) {
      where.createdAt = {};
      if (filter.startDate) where.createdAt.gte = filter.startDate;
      if (filter.endDate) where.createdAt.lte = filter.endDate;
    }

    return await prisma.ride.findMany({
      where,
      include: {
        passenger: {
          select: {
            id: true,
            name: true,
            phone: true,
            avatarUrl: true,
          },
        },
        driver: {
          select: {
            id: true,
            name: true,
            phone: true,
            avatarUrl: true,
            vehicleModel: true,
            vehiclePlate: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: Prisma.RideUpdateInput): Promise<Ride> {
    return await prisma.ride.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Ride> {
    return await prisma.ride.delete({
      where: { id },
    });
  }

  async findPendingRides(): Promise<Ride[]> {
    return await prisma.ride.findMany({
      where: {
        status: 'PENDING',
        driverId: null,
      },
      include: {
        passenger: {
          select: {
            id: true,
            name: true,
            phone: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async acceptRide(rideId: string, driverId: string): Promise<Ride> {
    return await prisma.ride.update({
      where: { id: rideId },
      data: {
        driverId,
        status: 'ACCEPTED',
      },
    });
  }

  async startRide(rideId: string): Promise<Ride> {
    return await prisma.ride.update({
      where: { id: rideId },
      data: {
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      },
    });
  }

  async completeRide(rideId: string, finalPrice: number, distanceKm: number, durationMin: number): Promise<Ride> {
    return await prisma.ride.update({
      where: { id: rideId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        finalPrice,
        distanceKm,
        durationMin,
      },
    });
  }

  async cancelRide(rideId: string): Promise<Ride> {
    return await prisma.ride.update({
      where: { id: rideId },
      data: {
        status: 'CANCELLED',
      },
    });
  }
}
