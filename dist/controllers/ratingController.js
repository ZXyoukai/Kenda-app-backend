"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAverageRating = exports.getUserRatings = exports.getRatingByRideId = exports.getRatingById = exports.createRating = void 0;
const ratingService_1 = require("../services/ratingService");
const ratingService = new ratingService_1.RatingService();
const createRating = async (req, res) => {
    try {
        const rating = await ratingService.createRating(req.body);
        res.status(201).json(rating);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message || 'Failed to create rating' });
    }
};
exports.createRating = createRating;
const getRatingById = async (req, res) => {
    try {
        const { id } = req.params;
        const rating = await ratingService.getRatingById(id);
        if (!rating) {
            res.status(404).json({ error: 'Rating not found' });
            return;
        }
        res.json(rating);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getRatingById = getRatingById;
const getRatingByRideId = async (req, res) => {
    try {
        const { rideId } = req.params;
        const rating = await ratingService.getRatingByRideId(rideId);
        if (!rating) {
            res.status(404).json({ error: 'Rating not found' });
            return;
        }
        res.json(rating);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getRatingByRideId = getRatingByRideId;
const getUserRatings = async (req, res) => {
    try {
        const { userId } = req.params;
        const ratings = await ratingService.getUserRatings(userId);
        res.json(ratings);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserRatings = getUserRatings;
const getUserAverageRating = async (req, res) => {
    try {
        const { userId } = req.params;
        const average = await ratingService.getUserAverageRating(userId);
        res.json({ averageRating: average });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserAverageRating = getUserAverageRating;
