import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import Product from "./product.js";

const Cart = sequelize.define(
  "Cart",
  {
    // Session identifier for all users (logged in or guests)
    session_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Optional: populated when user is logged in"
    }
  },
  {
    tableName: "carts",
    timestamps: true,
  }
);

// Relationships
Product.hasMany(Cart, { foreignKey: "product_id" });
Cart.belongsTo(Product, { foreignKey: "product_id" });

export default Cart;