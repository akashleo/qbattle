import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import healthRoutes from './routes/health.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(healthRoutes);

export default app;
