import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class StatsService {
  async getUserStats(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        ridesAsPassenger: {
          where: { status: 'COMPLETED' },
        },
        transactions: true,
        ratingsReceived: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const totalRides = user.ridesAsPassenger.length;
    const totalSpent = user.transactions.reduce((sum, t) => sum + t.amount, 0);
    const averageRating =
      user.ratingsReceived.length > 0
        ? user.ratingsReceived.reduce((sum, r) => sum + r.stars, 0) / user.ratingsReceived.length
        : 0;

    return {
      totalRides,
      totalSpent,
      averageRating: parseFloat(averageRating.toFixed(2)),
      totalRatings: user.ratingsReceived.length,
    };
  }

  async getDriverStats(driverId: string) {
    const driver = await prisma.user.findUnique({
      where: { id: driverId },
      include: {
        ridesAsDriver: {
          where: { status: 'COMPLETED' },
        },
        ratingsReceived: true,
      },
    });

    if (!driver || driver.role !== 'DRIVER') {
      return null;
    }

    const totalRides = driver.ridesAsDriver.length;
    const totalEarnings = driver.ridesAsDriver.reduce(
      (sum, r) => sum + (r.finalPrice || 0),
      0
    );
    const averageRating =
      driver.ratingsReceived.length > 0
        ? driver.ratingsReceived.reduce((sum, r) => sum + r.stars, 0) /
          driver.ratingsReceived.length
        : 0;

    return {
      totalRides,
      totalEarnings,
      averageRating: parseFloat(averageRating.toFixed(2)),
      totalRatings: driver.ratingsReceived.length,
      vehicleInfo: {
        model: driver.vehicleModel,
        plate: driver.vehiclePlate,
      },
      isOnline: driver.isOnline,
    };
  }

  async getSystemStats() {
    const [
      totalUsers,
      totalDrivers,
      totalPassengers,
      totalRides,
      totalTransactions,
      onlineDrivers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'DRIVER' } }),
      prisma.user.count({ where: { role: 'PASSENGER' } }),
      prisma.ride.count(),
      prisma.transaction.count(),
      prisma.user.count({ where: { role: 'DRIVER', isOnline: true } }),
    ]);

    const completedRides = await prisma.ride.count({
      where: { status: 'COMPLETED' },
    });

    const pendingRides = await prisma.ride.count({
      where: { status: 'PENDING' },
    });

    const totalRevenue = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: 'RIDE_PAYMENT' },
    });

    return {
      totalUsers,
      totalDrivers,
      totalPassengers,
      totalRides,
      completedRides,
      pendingRides,
      totalTransactions,
      onlineDrivers,
      totalRevenue: totalRevenue._sum.amount || 0,
    };
  }
}
