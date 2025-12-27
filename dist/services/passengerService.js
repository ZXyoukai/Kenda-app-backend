"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengerService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
class PassengerService {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    async getProfile(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            return null;
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            avatarUrl: user.avatarUrl,
            role: user.role,
            createdAt: user.createdAt,
        };
    }
    async updateProfile(id, data) {
        const user = await this.userRepository.update(id, data);
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            avatarUrl: user.avatarUrl,
            role: user.role,
            createdAt: user.createdAt,
        };
    }
    async getAllPassengers() {
        const passengers = await this.userRepository.findAll('PASSENGER');
        return passengers.map(user => ({
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            avatarUrl: user.avatarUrl,
            role: user.role,
            createdAt: user.createdAt,
        }));
    }
    async deletePassenger(id) {
        const user = await this.userRepository.findById(id);
        if (!user || user.role !== 'PASSENGER') {
            throw new Error('Passenger not found');
        }
        await this.userRepository.delete(id);
    }
}
exports.PassengerService = PassengerService;
