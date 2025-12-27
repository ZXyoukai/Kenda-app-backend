import { PrismaClient } from '@prisma/client';

/**
 * Singleton instance of Prisma Client
 */
let prisma: PrismaClient;

/**
 * Get or create Prisma Client instance
 */
export const getPrismaClient = (): PrismaClient => {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' 
        ? ['query', 'error', 'warn'] 
        : ['error'],
    });
  }
  return prisma;
};

/**
 * Close Prisma connection
 */
export const closePrismaConnection = async (): Promise<void> => {
  if (prisma) {
    await prisma.$disconnect();
  }
};

/**
 * Health check for database connection
 */
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const client = getPrismaClient();
    await client.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

export default getPrismaClient();
