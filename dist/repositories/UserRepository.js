"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class UserRepository {
    async create(data) {
        return await prisma_1.default.user.create({ data });
    }
    async findById(id) {
        return await prisma_1.default.user.findUnique({
            where: { id },
        });
    }
    async findByEmail(email) {
        return await prisma_1.default.user.findUnique({
            where: { email },
        });
    }
    async findAll(role) {
        return await prisma_1.default.user.findMany({
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
        });
    }
    async update(id, data) {
        return await prisma_1.default.user.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return await prisma_1.default.user.delete({
            where: { id },
        });
    }
    async findOnlineDrivers() {
        return await prisma_1.default.user.findMany({
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
        });
    }
    async updateLocation(id, lat, lng) {
        return await prisma_1.default.user.update({
            where: { id },
            data: {
                currentLat: lat,
                currentLng: lng,
            },
        });
    }
    async getDriverStats(driverId) {
        const ratings = await prisma_1.default.rating.findMany({
            where: { ratedUserId: driverId },
            select: { stars: true },
        });
        const totalRides = await prisma_1.default.ride.count({
            where: { driverId, status: 'COMPLETED' },
        });
        const averageRating = ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
            : 0;
        return { averageRating, totalRides };
    }
}
exports.UserRepository = UserRepository;
