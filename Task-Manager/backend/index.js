import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { lagMiddleware } from './middleware/lag.js'; 
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(lagMiddleware); // Applied globally

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(5001, () => console.log('Resilient Server listening on 5001'));