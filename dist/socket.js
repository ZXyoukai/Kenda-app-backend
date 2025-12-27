"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const initSocket = (httpServer) => {
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: '*', // Allow all origins for now (adjust for production)
            methods: ['GET', 'POST']
        }
    });
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);
        // Join a room based on user ID (for private notifications)
        socket.on('join', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined room ${userId}`);
        });
        // Driver updates location
        socket.on('updateLocation', (data) => {
            // Broadcast to anyone listening for this driver (or just emit to specific rides)
            // For simplicity, we might emit to a room specific to the ride or just broadcast
            io.emit(`driverLocation:${data.driverId}`, data);
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
    return io;
};
exports.initSocket = initSocket;
const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};
exports.getIO = getIO;
