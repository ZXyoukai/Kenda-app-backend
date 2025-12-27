import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kenda App API',
      version: '1.0.0',
      description: 'API backend para aplicativo de transporte de pessoas e cargas com sistema de pagamento em dinheiro e Multicaixa Express',
      contact: {
        name: 'Kenda Team',
        email: 'support@kenda.com',
      },
      license: {
        name: 'ISC',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.kenda.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            phone: { type: 'string', nullable: true },
            avatarUrl: { type: 'string', nullable: true },
            role: { type: 'string', enum: ['PASSENGER', 'DRIVER', 'ADMIN'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Driver: {
          allOf: [
            { $ref: '#/components/schemas/User' },
            {
              type: 'object',
              properties: {
                isOnline: { type: 'boolean' },
                currentLat: { type: 'number', nullable: true },
                currentLng: { type: 'number', nullable: true },
                vehicleModel: { type: 'string', nullable: true },
                vehiclePlate: { type: 'string', nullable: true },
                averageRating: { type: 'number' },
                totalRides: { type: 'number' },
              },
            },
          ],
        },
        Ride: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            passengerId: { type: 'string', format: 'uuid' },
            driverId: { type: 'string', format: 'uuid', nullable: true },
            status: { type: 'string', enum: ['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] },
            type: { type: 'string', enum: ['PERSON', 'CARGO'] },
            originLat: { type: 'number' },
            originLng: { type: 'number' },
            originAddress: { type: 'string' },
            destLat: { type: 'number' },
            destLng: { type: 'number' },
            destAddress: { type: 'string' },
            distanceKm: { type: 'number', nullable: true },
            durationMin: { type: 'number', nullable: true },
            estimatedPrice: { type: 'number' },
            finalPrice: { type: 'number', nullable: true },
            cargoDescription: { type: 'string', nullable: true },
            cargoWeight: { type: 'number', nullable: true },
            cargoDimensions: { type: 'string', nullable: true },
            scheduledAt: { type: 'string', format: 'date-time', nullable: true },
            startedAt: { type: 'string', format: 'date-time', nullable: true },
            completedAt: { type: 'string', format: 'date-time', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Transaction: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            rideId: { type: 'string', format: 'uuid', nullable: true },
            amount: { type: 'number' },
            type: { type: 'string', enum: ['RIDE_PAYMENT', 'REFUND'] },
            paymentMethod: { type: 'string', enum: ['CASH', 'MULTICAIXA_EXPRESS'] },
            description: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Rating: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            rideId: { type: 'string', format: 'uuid' },
            raterId: { type: 'string', format: 'uuid' },
            ratedUserId: { type: 'string', format: 'uuid' },
            stars: { type: 'integer', minimum: 1, maximum: 5 },
            comment: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Autenticação e registro de usuários' },
      { name: 'Passengers', description: 'Gestão de passageiros' },
      { name: 'Drivers', description: 'Gestão de motoristas' },
      { name: 'Rides', description: 'Gestão de viagens' },
      { name: 'Transactions', description: 'Gestão de transações' },
      { name: 'Ratings', description: 'Gestão de avaliações' },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
