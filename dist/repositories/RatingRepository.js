"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingRepository = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class RatingRepository {
    async create(data) {
        return await prisma_1.default.rating.create({ data });
    }
    async findById(id) {
        return await prisma_1.default.rating.findUnique({
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
    async findByRideId(rideId) {
        return await prisma_1.default.rating.findUnique({
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
    async findByUserId(userId) {
        return await prisma_1.default.rating.findMany({
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
    async getAverageRating(userId) {
        const result = await prisma_1.default.rating.aggregate({
            where: { ratedUserId: userId },
            _avg: {
                stars: true,
            },
        });
        return result._avg.stars || 0;
    }
}
exports.RatingRepository = RatingRepository;
