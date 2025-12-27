"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideRepository = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class RideRepository {
    async create(data) {
        return await prisma_1.default.ride.create({ data });
    }
    async findById(id) {
        return await prisma_1.default.ride.findUnique({
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
                rating: true,
                transaction: true,
            },
        });
    }
    async findAll(filter) {
        const where = {};
        if (filter?.passengerId)
            where.passengerId = filter.passengerId;
        if (filter?.driverId)
            where.driverId = filter.driverId;
        if (filter?.status)
            where.status = filter.status;
        if (filter?.startDate || filter?.endDate) {
            where.createdAt = {};
            if (filter.startDate)
                where.createdAt.gte = filter.startDate;
            if (filter.endDate)
                where.createdAt.lte = filter.endDate;
        }
        return await prisma_1.default.ride.findMany({
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
    async update(id, data) {
        return await prisma_1.default.ride.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return await prisma_1.default.ride.delete({
            where: { id },
        });
    }
    async findPendingRides() {
        return await prisma_1.default.ride.findMany({
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
    async acceptRide(rideId, driverId) {
        return await prisma_1.default.ride.update({
            where: { id: rideId },
            data: {
                driverId,
                status: 'ACCEPTED',
            },
        });
    }
    async startRide(rideId) {
        return await prisma_1.default.ride.update({
            where: { id: rideId },
            data: {
                status: 'IN_PROGRESS',
                startedAt: new Date(),
            },
        });
    }
    async completeRide(rideId, finalPrice, distanceKm, durationMin) {
        return await prisma_1.default.ride.update({
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
    async cancelRide(rideId) {
        return await prisma_1.default.ride.update({
            where: { id: rideId },
            data: {
                status: 'CANCELLED',
            },
        });
    }
}
exports.RideRepository = RideRepository;
