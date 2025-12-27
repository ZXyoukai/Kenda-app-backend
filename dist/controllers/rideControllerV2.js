"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRideStatus = exports.getNearbyRides = exports.requestRide = exports.deleteRide = exports.updateRide = exports.calculatePrice = exports.cancelRide = exports.completeRide = exports.startRide = exports.acceptRide = exports.getPendingRides = exports.getRideById = exports.getRides = exports.createRide = void 0;
const rideServiceV2_1 = require("../services/rideServiceV2");
const rideService = new rideServiceV2_1.RideServiceV2();
const createRide = async (req, res) => {
    try {
        const passengerId = req.user?.id;
        const rideData = { ...req.body, passengerId };
        const ride = await rideService.createRide(rideData);
        res.status(201).json(ride);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Failed to create ride' });
    }
};
exports.createRide = createRide;
const getRides = async (req, res) => {
    try {
        const { passengerId, driverId, status, type, startDate, endDate } = req.query;
        const filter = {};
        if (passengerId)
            filter.passengerId = passengerId;
        if (driverId)
            filter.driverId = driverId;
        if (status)
            filter.status = status;
        if (type)
            filter.type = type;
        if (startDate)
            filter.startDate = new Date(startDate);
        if (endDate)
            filter.endDate = new Date(endDate);
        const rides = await rideService.getRides(filter);
        res.json(rides);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getRides = getRides;
const getRideById = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await rideService.getRideById(id);
        if (!ride) {
            res.status(404).json({ error: 'Ride not found' });
            return;
        }
        res.json(ride);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getRideById = getRideById;
const getPendingRides = async (req, res) => {
    try {
        const rides = await rideService.getPendingRides();
        res.json(rides);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getPendingRides = getPendingRides;
const acceptRide = async (req, res) => {
    try {
        const { id } = req.params;
        const driverId = req.user?.id;
        if (req.user?.role !== 'DRIVER') {
            res.status(403).json({ error: 'Only drivers can accept rides' });
            return;
        }
        const ride = await rideService.acceptRide(id, driverId);
        res.json(ride);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Failed to accept ride' });
    }
};
exports.acceptRide = acceptRide;
const startRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await rideService.startRide(id);
        res.json(ride);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Failed to start ride' });
    }
};
exports.startRide = startRide;
const completeRide = async (req, res) => {
    try {
        const { id } = req.params;
        const { finalPrice, distanceKm, durationMin, paymentMethod } = req.body;
        const ride = await rideService.completeRide(id, finalPrice, distanceKm, durationMin, paymentMethod);
        res.json(ride);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Failed to complete ride' });
    }
};
exports.completeRide = completeRide;
const cancelRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await rideService.cancelRide(id);
        res.json(ride);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Failed to cancel ride' });
    }
};
exports.cancelRide = cancelRide;
const calculatePrice = async (req, res) => {
    try {
        const { distanceKm, durationMin, type } = req.body;
        const price = rideService.calculatePrice(distanceKm, durationMin, type);
        res.json({ estimatedPrice: price });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to calculate price' });
    }
};
exports.calculatePrice = calculatePrice;
const updateRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await rideService.updateRide(id, req.body);
        res.json(ride);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Failed to update ride' });
    }
};
exports.updateRide = updateRide;
const deleteRide = async (req, res) => {
    try {
        const { id } = req.params;
        await rideService.deleteRide(id);
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Failed to delete ride' });
    }
};
exports.deleteRide = deleteRide;
// Legacy aliases for backward compatibility
exports.requestRide = exports.createRide;
exports.getNearbyRides = exports.getPendingRides;
exports.updateRideStatus = exports.updateRide;
