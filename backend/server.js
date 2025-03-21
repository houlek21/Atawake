import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import sequelize from './database/connection.js';
import userRoutes from './routes/userRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Backend is running with Sequelize!');
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Sync Sequelize models with the database
sequelize.sync({ alter: true })  // 'alter: true' will update tables if needed
  .then(() => console.log('Database & tables synced'))
  .catch(err => console.error('Error syncing database:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});