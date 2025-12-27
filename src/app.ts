import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import passengerRoutes from './routes/passengerRoutes';
import driverRoutes from './routes/driverRoutes';
import rideRoutes from './routes/rideRoutesV2';
import transactionRoutes from './routes/transactionRoutes';
import ratingRoutes from './routes/ratingRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/passengers', passengerRoutes);
app.use('/drivers', driverRoutes);
app.use('/rides', rideRoutes);
app.use('/transactions', transactionRoutes);
app.use('/ratings', ratingRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
