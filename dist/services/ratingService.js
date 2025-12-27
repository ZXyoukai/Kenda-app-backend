"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingService = void 0;
const RatingRepository_1 = require("../repositories/RatingRepository");
class RatingService {
    constructor() {
        this.ratingRepository = new RatingRepository_1.RatingRepository();
    }
    async createRating(data) {
        if (data.stars < 1 || data.stars > 5) {
            throw new Error('Rating must be between 1 and 5');
        }
        const existingRating = await this.ratingRepository.findByRideId(data.rideId);
        if (existingRating) {
            throw new Error('Rating already exists for this ride');
        }
        const rating = await this.ratingRepository.create({
            ride: { connect: { id: data.rideId } },
            rater: { connect: { id: data.raterId } },
            ratedUser: { connect: { id: data.ratedUserId } },
            stars: data.stars,
            comment: data.comment,
        });
        return this.mapToResponseDTO(rating);
    }
    async getRatingById(id) {
        const rating = await this.ratingRepository.findById(id);
        if (!rating) {
            return null;
        }
        return this.mapToResponseDTO(rating);
    }
    async getRatingByRideId(rideId) {
        const rating = await this.ratingRepository.findByRideId(rideId);
        if (!rating) {
            return null;
        }
        return this.mapToResponseDTO(rating);
    }
    async getUserRatings(userId) {
        const ratings = await this.ratingRepository.findByUserId(userId);
        return ratings.map(rating => this.mapToResponseDTO(rating));
    }
    async getUserAverageRating(userId) {
        return await this.ratingRepository.getAverageRating(userId);
    }
    mapToResponseDTO(rating) {
        return {
            id: rating.id,
            rideId: rating.rideId,
            raterId: rating.raterId,
            ratedUserId: rating.ratedUserId,
            stars: rating.stars,
            comment: rating.comment,
            createdAt: rating.createdAt,
        };
    }
}
exports.RatingService = RatingService;
