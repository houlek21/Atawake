import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import sequelize from './database/connection.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Backend is running with Sequelize!');
});

// Use user routes
app.use('/api/users', userRoutes);

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => console.log('Database & tables synced'))
  .catch(err => console.error('Error syncing database:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
