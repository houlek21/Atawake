import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import Seller from "./seller.js";
import Category from "./category.js";

const Product = sequelize.define(
  "Product",
  {
    // No explicit 'id' => Sequelize will create it automatically as the primary key (INTEGER auto-increment)
    seller_id: {
      type: DataTypes.INTEGER, // references Seller.id
      allowNull: false,
      references: {
        model: Seller,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    category_id: {
      type: DataTypes.INTEGER, // references Category.id
      references: {
        model: Category,
        key: "id",
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

// Relationships
Seller.hasMany(Product, { foreignKey: "seller_id" });
Product.belongsTo(Seller, { foreignKey: "seller_id" });

Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

export default Product;

