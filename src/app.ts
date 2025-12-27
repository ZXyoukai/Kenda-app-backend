import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import authRoutes from './routes/authRoutes';
import passengerRoutes from './routes/passengerRoutes';
import driverRoutes from './routes/driverRoutes';
import rideRoutes from './routes/rideRoutesV2';
import transactionRoutes from './routes/transactionRoutes';
import ratingRoutes from './routes/ratingRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Kenda API Documentation',
}));

// Swagger JSON
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes
app.use('/auth', authRoutes);
app.use('/passengers', passengerRoutes);
app.use('/drivers', driverRoutes);
app.use('/rides', rideRoutes);
app.use('/transactions', transactionRoutes);
app.use('/ratings', ratingRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Kenda API is running',
    documentation: '/api-docs',
    health: '/health',
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
