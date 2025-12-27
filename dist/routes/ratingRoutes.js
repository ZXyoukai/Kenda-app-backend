"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const ratingController_1 = require("../controllers/ratingController");
const router = (0, express_1.Router)();
// All routes require authentication
router.post('/', authMiddleware_1.authenticate, ratingController_1.createRating);
router.get('/:id', authMiddleware_1.authenticate, ratingController_1.getRatingById);
router.get('/ride/:rideId', authMiddleware_1.authenticate, ratingController_1.getRatingByRideId);
router.get('/user/:userId', authMiddleware_1.authenticate, ratingController_1.getUserRatings);
router.get('/user/:userId/average', authMiddleware_1.authenticate, ratingController_1.getUserAverageRating);
exports.default = router;
