"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePassenger = exports.getPassengerById = exports.getAllPassengers = exports.updateProfile = exports.getProfile = void 0;
const passengerService_1 = require("../services/passengerService");
const passengerService = new passengerService_1.PassengerService();
const getProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const profile = await passengerService.getProfile(userId);
        if (!profile) {
            res.status(404).json({ error: 'Passenger not found' });
            return;
        }
        res.json(profile);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const profile = await passengerService.updateProfile(userId, req.body);
        res.json(profile);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateProfile = updateProfile;
const getAllPassengers = async (req, res) => {
    try {
        const passengers = await passengerService.getAllPassengers();
        res.json(passengers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllPassengers = getAllPassengers;
const getPassengerById = async (req, res) => {
    try {
        const { id } = req.params;
        const passenger = await passengerService.getProfile(id);
        if (!passenger) {
            res.status(404).json({ error: 'Passenger not found' });
            return;
        }
        res.json(passenger);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getPassengerById = getPassengerById;
const deletePassenger = async (req, res) => {
    try {
        const { id } = req.params;
        await passengerService.deletePassenger(id);
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};
exports.deletePassenger = deletePassenger;
