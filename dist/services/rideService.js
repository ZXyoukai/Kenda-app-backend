"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyRideUpdate = exports.notifyNewRide = exports.calculatePrice = void 0;
const socket_1 = require("../socket");
const calculatePrice = (distanceKm, durationMin, type) => {
    const basePrice = type === 'CARGO' ? 10.0 : 5.0;
    const pricePerKm = type === 'CARGO' ? 2.0 : 1.5;
    const pricePerMin = 0.5;
    const total = basePrice + (distanceKm * pricePerKm) + (durationMin * pricePerMin);
    return parseFloat(total.toFixed(2));
};
exports.calculatePrice = calculatePrice;
const notifyNewRide = (ride) => {
    const io = (0, socket_1.getIO)();
    // Broadcast to all drivers or specific room
    // In a real app, you'd filter by location (Geospatial query)
    io.emit('newRideAvailable', ride);
};
exports.notifyNewRide = notifyNewRide;
const notifyRideUpdate = (ride) => {
    const io = (0, socket_1.getIO)();
    // Notify the passenger specifically
    io.to(ride.passengerId).emit('rideStatusUpdated', ride);
    // Also notify the driver if assigned
    if (ride.driverId) {
        io.to(ride.driverId).emit('rideStatusUpdated', ride);
    }
};
exports.notifyRideUpdate = notifyRideUpdate;
