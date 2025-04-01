import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import User from "./user.js";

const Order = sequelize.define(
  "Order",
  {
    // No explicit 'id' => Sequelize will create it automatically as the primary key
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    subtotal_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tax_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    order_status: {
      type: DataTypes.ENUM(
        "pending", 
        "payment_processing", 
        "payment_completed", 
        "shipped", 
        "delivered", 
        "canceled"
      ),
      defaultValue: "pending",
    },
    payment_intent_id: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: true, // Stripe payment intent ID
    },
    shipping_address: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Complete shipping address including city, state, postal code"
    },
    // Basic contact info
    contact_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    contact_phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

// Relationships
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

export default Order;