"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.requirePassenger = exports.requireDriver = exports.requireRole = void 0;
const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
exports.requireDriver = (0, exports.requireRole)('DRIVER', 'ADMIN');
exports.requirePassenger = (0, exports.requireRole)('PASSENGER', 'ADMIN');
exports.requireAdmin = (0, exports.requireRole)('ADMIN');
