import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

let io: Server;

export const initSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*', // Allow all origins for now (adjust for production)
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log('New client connected:', socket.id);

    // Join a room based on user ID (for private notifications)
    socket.on('join', (userId: string) => {
      socket.join(userId);
      console.log(`User ${userId} joined room ${userId}`);
    });

    // Driver updates location
    socket.on('updateLocation', (data: { driverId: string; lat: number; lng: number }) => {
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

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
