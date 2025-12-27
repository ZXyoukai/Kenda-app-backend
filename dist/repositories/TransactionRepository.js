"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepository = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class TransactionRepository {
    async create(data) {
        return await prisma_1.default.transaction.create({ data });
    }
    async findById(id) {
        return await prisma_1.default.transaction.findUnique({
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
    async findAll(filter) {
        const where = {};
        if (filter?.userId)
            where.userId = filter.userId;
        if (filter?.rideId)
            where.rideId = filter.rideId;
        if (filter?.type)
            where.type = filter.type;
        if (filter?.paymentMethod)
            where.paymentMethod = filter.paymentMethod;
        if (filter?.startDate || filter?.endDate) {
            where.createdAt = {};
            if (filter.startDate)
                where.createdAt.gte = filter.startDate;
            if (filter.endDate)
                where.createdAt.lte = filter.endDate;
        }
        return await prisma_1.default.transaction.findMany({
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
    async delete(id) {
        return await prisma_1.default.transaction.delete({
            where: { id },
        });
    }
    async findByRideId(rideId) {
        return await prisma_1.default.transaction.findFirst({
            where: { rideId },
        });
    }
    async getTotalByUser(userId, type) {
        const result = await prisma_1.default.transaction.aggregate({
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
exports.TransactionRepository = TransactionRepository;
