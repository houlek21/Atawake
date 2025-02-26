import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const Category = sequelize.define(
  "Category",
  {
    // No explicit 'id' => Sequelize will create it automatically as the primary key (INTEGER auto-increment)
    category_name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  }
);

export default Category;
