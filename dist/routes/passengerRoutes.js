"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const passengerController_1 = require("../controllers/passengerController");
const router = (0, express_1.Router)();
// Passenger routes (authenticated)
router.get('/profile', authMiddleware_1.authenticate, passengerController_1.getProfile);
router.put('/profile', authMiddleware_1.authenticate, passengerController_1.updateProfile);
// Admin routes (for managing passengers)
router.get('/', authMiddleware_1.authenticate, passengerController_1.getAllPassengers);
router.get('/:id', authMiddleware_1.authenticate, passengerController_1.getPassengerById);
router.delete('/:id', authMiddleware_1.authenticate, passengerController_1.deletePassenger);
exports.default = router;
