import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


import { runMigrations } from './db/migrate.js';
import authRoutes from './routes/auth.routes.js';
import categoryRoutes from './routes/category.routes.js';
import itemRoutes from './routes/item.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const api = process.env.PREFIX || '/api/v1';

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (_req, res) => res.json({ status: 'Server is running' }));
app.get('/api', (_req, res) => res.json({ status: 'Welcome to the API' }));
app.get('/api/test', (_req, res) => res.json({ status: 'test ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
  await runMigrations();
  app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  });
};

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
