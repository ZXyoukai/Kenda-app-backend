import { Transaction, TransactionType, PaymentMethod, Prisma } from '@prisma/client';
import prisma from '../prisma';

export class TransactionRepository {
  async create(data: Prisma.TransactionCreateInput): Promise<Transaction> {
    return await prisma.transaction.create({ data });
  }

  async findById(id: string): Promise<Transaction | null> {
    return await prisma.transaction.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        ride: true,
      },
    });
  }

  async findAll(filter?: {
    userId?: string;
    rideId?: string;
    type?: TransactionType;
    paymentMethod?: PaymentMethod;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Transaction[]> {
    const where: Prisma.TransactionWhereInput = {};

    if (filter?.userId) where.userId = filter.userId;
    if (filter?.rideId) where.rideId = filter.rideId;
    if (filter?.type) where.type = filter.type;
    if (filter?.paymentMethod) where.paymentMethod = filter.paymentMethod;
    if (filter?.startDate || filter?.endDate) {
      where.createdAt = {};
      if (filter.startDate) where.createdAt.gte = filter.startDate;
      if (filter.endDate) where.createdAt.lte = filter.endDate;
    }

    return await prisma.transaction.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        ride: {
          select: {
            id: true,
            status: true,
            type: true,
            originAddress: true,
            destAddress: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string): Promise<Transaction> {
    return await prisma.transaction.delete({
      where: { id },
    });
  }

  async findByRideId(rideId: string): Promise<Transaction | null> {
    return await prisma.transaction.findFirst({
      where: { rideId },
    });
  }

  async getTotalByUser(userId: string, type?: TransactionType): Promise<number> {
    const result = await prisma.transaction.aggregate({
      where: {
        userId,
        type,
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount || 0;
  }
}
