import { User, Role, Prisma } from '@prisma/client';
import prisma from '../prisma';

export class UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({ data });
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(role?: Role): Promise<User[]> {
    return await prisma.user.findMany({
      where: role ? { role } : undefined,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatarUrl: true,
        role: true,
        isOnline: true,
        currentLat: true,
        currentLng: true,
        vehicleModel: true,
        vehiclePlate: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    }) as any;
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<User> {
    return await prisma.user.delete({
      where: { id },
    });
  }

  async findOnlineDrivers(): Promise<User[]> {
    return await prisma.user.findMany({
      where: {
        role: 'DRIVER',
        isOnline: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatarUrl: true,
        role: true,
        isOnline: true,
        currentLat: true,
        currentLng: true,
        vehicleModel: true,
        vehiclePlate: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    }) as any;
  }

  async updateLocation(id: string, lat: number, lng: number): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: {
        currentLat: lat,
        currentLng: lng,
      },
    });
  }

  async getDriverStats(driverId: string): Promise<{ averageRating: number; totalRides: number }> {
    const ratings = await prisma.rating.findMany({
      where: { ratedUserId: driverId },
      select: { stars: true },
    });

    const totalRides = await prisma.ride.count({
      where: { driverId, status: 'COMPLETED' },
    });

    const averageRating = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
      : 0;

    return { averageRating, totalRides };
  }
}
