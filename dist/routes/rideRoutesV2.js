"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const rideControllerV2_1 = require("../controllers/rideControllerV2");
const router = (0, express_1.Router)();
// Public routes
router.post('/calculate-price', rideControllerV2_1.calculatePrice);
// Authenticated routes
router.post('/', authMiddleware_1.authenticate, rideControllerV2_1.createRide);
router.get('/', authMiddleware_1.authenticate, rideControllerV2_1.getRides);
router.get('/pending', authMiddleware_1.authenticate, rideControllerV2_1.getPendingRides);
router.get('/:id', authMiddleware_1.authenticate, rideControllerV2_1.getRideById);
router.put('/:id', authMiddleware_1.authenticate, rideControllerV2_1.updateRide);
router.delete('/:id', authMiddleware_1.authenticate, rideControllerV2_1.deleteRide);
// Driver actions
router.post('/:id/accept', authMiddleware_1.authenticate, rideControllerV2_1.acceptRide);
router.post('/:id/start', authMiddleware_1.authenticate, rideControllerV2_1.startRide);
router.post('/:id/complete', authMiddleware_1.authenticate, rideControllerV2_1.completeRide);
router.post('/:id/cancel', authMiddleware_1.authenticate, rideControllerV2_1.cancelRide);
exports.default = router;
