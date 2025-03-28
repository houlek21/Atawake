import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import Product from "./product.js";

const ProductMedia = sequelize.define("ProductMedia", {
    // No explicit 'id' => Sequelize will create it automatically as the primary key (INTEGER auto-increment)
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    media_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    media_type: {
      type: DataTypes.ENUM("image", "video"),
      defaultValue: "image",
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: "product_media",
    timestamps: true,
});

// Relationships 
Product.hasMany(ProductMedia, { foreignKey: "product_id" });
ProductMedia.belongsTo(Product, { foreignKey: "product_id" });
  
export default ProductMedia;
  