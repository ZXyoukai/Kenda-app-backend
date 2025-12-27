"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
class DriverService {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    async getProfile(id) {
        const user = await this.userRepository.findById(id);
        if (!user || user.role !== 'DRIVER') {
            return null;
        }
        const stats = await this.userRepository.getDriverStats(id);
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            avatarUrl: user.avatarUrl,
            role: user.role,
            isOnline: user.isOnline,
            currentLat: user.currentLat,
            currentLng: user.currentLng,
            vehicleModel: user.vehicleModel,
            vehiclePlate: user.vehiclePlate,
            createdAt: user.createdAt,
            averageRating: stats.averageRating,
            totalRides: stats.totalRides,
        };
    }
    async updateProfile(id, data) {
        const user = await this.userRepository.update(id, data);
        const stats = await this.userRepository.getDriverStats(id);
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            avatarUrl: user.avatarUrl,
            role: user.role,
            isOnline: user.isOnline,
            currentLat: user.currentLat,
            currentLng: user.currentLng,
            vehicleModel: user.vehicleModel,
            vehiclePlate: user.vehiclePlate,
            createdAt: user.createdAt,
            averageRating: stats.averageRating,
            totalRides: stats.totalRides,
        };
    }
    async getAllDrivers() {
        const drivers = await this.userRepository.findAll('DRIVER');
        const driversWithStats = await Promise.all(drivers.map(async (driver) => {
            const stats = await this.userRepository.getDriverStats(driver.id);
            return {
                id: driver.id,
                email: driver.email,
                name: driver.name,
                phone: driver.phone,
                avatarUrl: driver.avatarUrl,
                role: driver.role,
                isOnline: driver.isOnline,
                currentLat: driver.currentLat,
                currentLng: driver.currentLng,
                vehicleModel: driver.vehicleModel,
                vehiclePlate: driver.vehiclePlate,
                createdAt: driver.createdAt,
                averageRating: stats.averageRating,
                totalRides: stats.totalRides,
            };
        }));
        return driversWithStats;
    }
    async getOnlineDrivers() {
        const drivers = await this.userRepository.findOnlineDrivers();
        const driversWithStats = await Promise.all(drivers.map(async (driver) => {
            const stats = await this.userRepository.getDriverStats(driver.id);
            return {
                id: driver.id,
                email: driver.email,
                name: driver.name,
                phone: driver.phone,
                avatarUrl: driver.avatarUrl,
                role: driver.role,
                isOnline: driver.isOnline,
                currentLat: driver.currentLat,
                currentLng: driver.currentLng,
                vehicleModel: driver.vehicleModel,
                vehiclePlate: driver.vehiclePlate,
                createdAt: driver.createdAt,
                averageRating: stats.averageRating,
                totalRides: stats.totalRides,
            };
        }));
        return driversWithStats;
    }
    async updateLocation(id, lat, lng) {
        await this.userRepository.updateLocation(id, lat, lng);
    }
    async setOnlineStatus(id, isOnline) {
        const user = await this.userRepository.update(id, { isOnline });
        const stats = await this.userRepository.getDriverStats(id);
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            avatarUrl: user.avatarUrl,
            role: user.role,
            isOnline: user.isOnline,
            currentLat: user.currentLat,
            currentLng: user.currentLng,
            vehicleModel: user.vehicleModel,
            vehiclePlate: user.vehiclePlate,
            createdAt: user.createdAt,
            averageRating: stats.averageRating,
            totalRides: stats.totalRides,
        };
    }
    async deleteDriver(id) {
        const user = await this.userRepository.findById(id);
        if (!user || user.role !== 'DRIVER') {
            throw new Error('Driver not found');
        }
        await this.userRepository.delete(id);
    }
}
exports.DriverService = DriverService;
