"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: 'No token provided' });
        return;
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        res.status(401).json({ error: 'Token error' });
        return;
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        res.status(401).json({ error: 'Token malformatted' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'Token invalid' });
        return;
    }
};
exports.authMiddleware = authMiddleware;
// Alias for consistency
exports.authenticate = exports.authMiddleware;
