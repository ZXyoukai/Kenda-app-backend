import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import rideRoutes from './routes/rideRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/rides', rideRoutes);

app.get('/', (req, res) => {
  res.send('Kenda API is running');
});

export default app;
