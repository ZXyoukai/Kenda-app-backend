"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideServiceV2 = void 0;
const RideRepository_1 = require("../repositories/RideRepository");
const TransactionRepository_1 = require("../repositories/TransactionRepository");
const socket_1 = require("../socket");
class RideServiceV2 {
    constructor() {
        this.rideRepository = new RideRepository_1.RideRepository();
        this.transactionRepository = new TransactionRepository_1.TransactionRepository();
    }
    async createRide(data) {
        const ride = await this.rideRepository.create({
            passenger: { connect: { id: data.passengerId } },
            type: data.type,
            originLat: data.originLat,
            originLng: data.originLng,
            originAddress: data.originAddress,
            destLat: data.destLat,
            destLng: data.destLng,
            destAddress: data.destAddress,
            estimatedPrice: data.estimatedPrice,
            cargoDescription: data.cargoDescription,
            cargoWeight: data.cargoWeight,
            cargoDimensions: data.cargoDimensions,
            scheduledAt: data.scheduledAt,
        });
        // Notify available drivers
        const io = (0, socket_1.getIO)();
        io.emit('newRideAvailable', ride);
        return this.mapToResponseDTO(ride);
    }
    async getRideById(id) {
        const ride = await this.rideRepository.findById(id);
        if (!ride) {
            return null;
        }
        return this.mapToResponseDTO(ride);
    }
    async getRides(filter) {
        const rides = await this.rideRepository.findAll(filter);
        return rides.map(ride => this.mapToResponseDTO(ride));
    }
    async getPendingRides() {
        const rides = await this.rideRepository.findPendingRides();
        return rides.map(ride => this.mapToResponseDTO(ride));
    }
    async acceptRide(rideId, driverId) {
        const ride = await this.rideRepository.acceptRide(rideId, driverId);
        // Notify passenger and driver
        const io = (0, socket_1.getIO)();
        io.to(ride.passengerId).emit('rideAccepted', ride);
        io.to(driverId).emit('rideAccepted', ride);
        return this.mapToResponseDTO(ride);
    }
    async startRide(rideId) {
        const ride = await this.rideRepository.startRide(rideId);
        const io = (0, socket_1.getIO)();
        io.to(ride.passengerId).emit('rideStarted', ride);
        if (ride.driverId) {
            io.to(ride.driverId).emit('rideStarted', ride);
        }
        return this.mapToResponseDTO(ride);
    }
    async completeRide(rideId, finalPrice, distanceKm, durationMin, paymentMethod) {
        const ride = await this.rideRepository.completeRide(rideId, finalPrice, distanceKm, durationMin);
        // Create transaction
        await this.transactionRepository.create({
            user: { connect: { id: ride.passengerId } },
            ride: { connect: { id: rideId } },
            amount: finalPrice,
            type: 'RIDE_PAYMENT',
            paymentMethod: paymentMethod,
            description: `Pagamento da viagem de ${ride.originAddress} para ${ride.destAddress}`,
        });
        const io = (0, socket_1.getIO)();
        io.to(ride.passengerId).emit('rideCompleted', ride);
        if (ride.driverId) {
            io.to(ride.driverId).emit('rideCompleted', ride);
        }
        return this.mapToResponseDTO(ride);
    }
    async cancelRide(rideId) {
        const ride = await this.rideRepository.cancelRide(rideId);
        const io = (0, socket_1.getIO)();
        io.to(ride.passengerId).emit('rideCancelled', ride);
        if (ride.driverId) {
            io.to(ride.driverId).emit('rideCancelled', ride);
        }
        return this.mapToResponseDTO(ride);
    }
    async updateRide(rideId, data) {
        const ride = await this.rideRepository.update(rideId, data);
        return this.mapToResponseDTO(ride);
    }
    async deleteRide(rideId) {
        await this.rideRepository.delete(rideId);
    }
    calculatePrice(distanceKm, durationMin, type) {
        const basePrice = type === 'CARGO' ? 10.0 : 5.0;
        const pricePerKm = type === 'CARGO' ? 2.0 : 1.5;
        const pricePerMin = 0.5;
        const total = basePrice + (distanceKm * pricePerKm) + (durationMin * pricePerMin);
        return parseFloat(total.toFixed(2));
    }
    mapToResponseDTO(ride) {
        return {
            id: ride.id,
            passengerId: ride.passengerId,
            driverId: ride.driverId,
            status: ride.status,
            type: ride.type,
            originLat: ride.originLat,
            originLng: ride.originLng,
            originAddress: ride.originAddress,
            destLat: ride.destLat,
            destLng: ride.destLng,
            destAddress: ride.destAddress,
            distanceKm: ride.distanceKm,
            durationMin: ride.durationMin,
            estimatedPrice: ride.estimatedPrice,
            finalPrice: ride.finalPrice,
            cargoDescription: ride.cargoDescription,
            cargoWeight: ride.cargoWeight,
            cargoDimensions: ride.cargoDimensions,
            scheduledAt: ride.scheduledAt,
            startedAt: ride.startedAt,
            completedAt: ride.completedAt,
            createdAt: ride.createdAt,
            updatedAt: ride.updatedAt,
        };
    }
}
exports.RideServiceV2 = RideServiceV2;
