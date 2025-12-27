"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDatabaseConnection = exports.closePrismaConnection = exports.getPrismaClient = void 0;
const client_1 = require("@prisma/client");
/**
 * Singleton instance of Prisma Client
 */
let prisma;
/**
 * Get or create Prisma Client instance
 */
const getPrismaClient = () => {
    if (!prisma) {
        prisma = new client_1.PrismaClient({
            log: process.env.NODE_ENV === 'development'
                ? ['query', 'error', 'warn']
                : ['error'],
        });
    }
    return prisma;
};
exports.getPrismaClient = getPrismaClient;
/**
 * Close Prisma connection
 */
const closePrismaConnection = async () => {
    if (prisma) {
        await prisma.$disconnect();
    }
};
exports.closePrismaConnection = closePrismaConnection;
/**
 * Health check for database connection
 */
const checkDatabaseConnection = async () => {
    try {
        const client = (0, exports.getPrismaClient)();
        await client.$queryRaw `SELECT 1`;
        return true;
    }
    catch (error) {
        console.error('Database connection failed:', error);
        return false;
    }
};
exports.checkDatabaseConnection = checkDatabaseConnection;
exports.default = (0, exports.getPrismaClient)();
