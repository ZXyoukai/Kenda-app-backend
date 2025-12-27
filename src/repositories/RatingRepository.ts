import { Rating, Prisma } from '@prisma/client';
import prisma from '../prisma';

export class RatingRepository {
  async create(data: Prisma.RatingCreateInput): Promise<Rating> {
    return await prisma.rating.create({ data });
  }

  async findById(id: string): Promise<Rating | null> {
    return await prisma.rating.findUnique({
      where: { id },
      include: {
        rater: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        ratedUser: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        ride: true,
      },
    });
  }

  async findByRideId(rideId: string): Promise<Rating | null> {
    return await prisma.rating.findUnique({
      where: { rideId },
      include: {
        rater: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        ratedUser: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<Rating[]> {
    return await prisma.rating.findMany({
      where: {
        OR: [
          { raterId: userId },
          { ratedUserId: userId },
        ],
      },
      include: {
        rater: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        ratedUser: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        ride: {
          select: {
            id: true,
            type: true,
            originAddress: true,
            destAddress: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAverageRating(userId: string): Promise<number> {
    const result = await prisma.rating.aggregate({
      where: { ratedUserId: userId },
      _avg: {
        stars: true,
      },
    });

    return result._avg.stars || 0;
  }
}
