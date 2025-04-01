import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import User from "./user.js";
import Order from "./order.js";

const Payment = sequelize.define(
  "Payment",
  {
    // No explicit 'id' => Sequelize will create it automatically as the primary key (INTEGER auto-increment)
    order_id: {
      type: DataTypes.INTEGER, // references Order.id
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER, // references User.id
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    payment_method: {
      type: DataTypes.ENUM("credit_card"),
      allowNull: false,
      defaultValue: "credit_card",
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "processing", "completed", "failed", "refunded"),
      defaultValue: "pending",
    },
    stripe_payment_intent_id: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      comment: "Stripe Payment Intent ID",
    },
    stripe_payment_method_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Stripe Payment Method ID",
    },
    card_brand: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Card brand (Visa, Mastercard, etc.)",
    },
    card_last4: {
      type: DataTypes.STRING(4),
      allowNull: true,
      comment: "Last 4 digits of card",
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    receipt_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "URL to Stripe receipt",
    },
  },
  {
    tableName: "payments",
    timestamps: true,
  }
);

// Relationships
Order.hasMany(Payment, { foreignKey: "order_id" });
Payment.belongsTo(Order, { foreignKey: "order_id" });

User.hasMany(Payment, { foreignKey: "user_id" });
Payment.belongsTo(User, { foreignKey: "user_id" });

export default Payment;