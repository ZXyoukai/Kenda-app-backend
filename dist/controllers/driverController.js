"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriver = exports.setOnlineStatus = exports.updateLocation = exports.getDriverById = exports.getOnlineDrivers = exports.getAllDrivers = exports.updateProfile = exports.getProfile = void 0;
const driverService_1 = require("../services/driverService");
const driverService = new driverService_1.DriverService();
const getProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const profile = await driverService.getProfile(userId);
        if (!profile) {
            res.status(404).json({ error: 'Driver not found' });
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
        const profile = await driverService.updateProfile(userId, req.body);
        res.json(profile);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateProfile = updateProfile;
const getAllDrivers = async (req, res) => {
    try {
        const drivers = await driverService.getAllDrivers();
        res.json(drivers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllDrivers = getAllDrivers;
const getOnlineDrivers = async (req, res) => {
    try {
        const drivers = await driverService.getOnlineDrivers();
        res.json(drivers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getOnlineDrivers = getOnlineDrivers;
const getDriverById = async (req, res) => {
    try {
        const { id } = req.params;
        const driver = await driverService.getProfile(id);
        if (!driver) {
            res.status(404).json({ error: 'Driver not found' });
            return;
        }
        res.json(driver);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getDriverById = getDriverById;
const updateLocation = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { lat, lng } = req.body;
        await driverService.updateLocation(userId, lat, lng);
        res.json({ message: 'Location updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateLocation = updateLocation;
const setOnlineStatus = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { isOnline } = req.body;
        const driver = await driverService.setOnlineStatus(userId, isOnline);
        res.json(driver);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.setOnlineStatus = setOnlineStatus;
const deleteDriver = async (req, res) => {
    try {
        const { id } = req.params;
        await driverService.deleteDriver(id);
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};
exports.deleteDriver = deleteDriver;
