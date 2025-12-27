"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
const authService = new authService_1.AuthService();
const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message || 'Registration failed' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message || 'Login failed' });
    }
};
exports.login = login;
