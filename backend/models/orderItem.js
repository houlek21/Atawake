import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import Order from "./order.js";
import Product from "./product.js";

const OrderItem = sequelize.define(
  "OrderItem",
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
    product_id: {
      type: DataTypes.INTEGER, // references Product.id
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    price_at_purchase: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "order_items",
    timestamps: true,
  }
);

// Relationships
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

export default OrderItem;

