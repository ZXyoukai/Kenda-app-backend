"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const driverController_1 = require("../controllers/driverController");
const router = (0, express_1.Router)();
// Driver routes (authenticated)
router.get('/profile', authMiddleware_1.authenticate, driverController_1.getProfile);
router.put('/profile', authMiddleware_1.authenticate, driverController_1.updateProfile);
router.put('/location', authMiddleware_1.authenticate, driverController_1.updateLocation);
router.put('/status', authMiddleware_1.authenticate, driverController_1.setOnlineStatus);
// Public/Admin routes
router.get('/', driverController_1.getAllDrivers);
router.get('/online', driverController_1.getOnlineDrivers);
router.get('/:id', driverController_1.getDriverById);
router.delete('/:id', authMiddleware_1.authenticate, driverController_1.deleteDriver);
exports.default = router;
