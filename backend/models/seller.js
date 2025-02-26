import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import User from "./user.js";

const Seller = sequelize.define(
  "Seller",
  {
    // No explicit 'id' => Sequelize will create it automatically as the primary key (INTEGER auto-increment)
    user_id: {
      type: DataTypes.INTEGER, // References 'id' in the User model
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE", // If a user is deleted, remove the associated seller profile
    },
    business_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contact_person: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    business_phone: {
      type: DataTypes.STRING(20),
    },
    business_address: {
      type: DataTypes.TEXT,
    },
    about_us_description: {
      type: DataTypes.TEXT,
    },
    indigenous_verification_status: {
      type: DataTypes.ENUM("pending", "verified", "rejected"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "sellers",
    timestamps: true,
  }
);

// Relationships
User.hasOne(Seller, { foreignKey: "user_id" });
Seller.belongsTo(User, { foreignKey: "user_id" });

export default Seller;
