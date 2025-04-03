import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const User = sequelize.define(
  "User",
  {
    // No explicit 'id' => Sequelize will create it automatically as the primary key (INTEGER auto-increment)
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true, // Validates email format
      },
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      validate: {
        is: {
          args: [/^\+?[1-9]\d{1,14}$/], // Regex for valid international phone numbers
          msg: "Phone number must be valid (e.g., +1234567890)",
        },
      },
    },
    address: {
      type: DataTypes.TEXT,
    },
    user_type: {
      type: DataTypes.ENUM("regular", "admin"),
      defaultValue: "regular",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;

