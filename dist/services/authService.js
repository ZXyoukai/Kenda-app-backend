"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = require("../repositories/UserRepository");
class AuthService {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    async register(data) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const user = await this.userRepository.create({
            email: data.email,
            password: hashedPassword,
            name: data.name,
            phone: data.phone,
            role: data.role || 'PASSENGER',
        });
        const token = this.generateToken(user.id, user.role);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                role: user.role,
                avatarUrl: user.avatarUrl,
            },
            token,
        };
    }
    async login(data) {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isMatch = await bcryptjs_1.default.compare(data.password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = this.generateToken(user.id, user.role);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                role: user.role,
                avatarUrl: user.avatarUrl,
            },
            token,
        };
    }
    generateToken(userId, role) {
        return jsonwebtoken_1.default.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (error) {
            throw new Error('Invalid token');
        }
    }
}
exports.AuthService = AuthService;
