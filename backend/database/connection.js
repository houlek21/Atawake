import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

try {
  await sequelize.authenticate();
  console.log('Connected to MySQL database via Sequelize');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Export as default
export default sequelize;

