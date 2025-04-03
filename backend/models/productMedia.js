import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import Product from "./product.js";

const ProductMedia = sequelize.define("ProductMedia", {
    // No explicit 'id' => Sequelize will create it automatically as the primary key
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    file_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Name of the uploaded file with extension"
    },
    file_path: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Local storage path relative to the uploads directory"
    },
    media_type: {
      type: DataTypes.ENUM("image", "video"),
      defaultValue: "image",
    },
    original_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Original filename before processing"
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    file_size: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "File size in bytes"
    },
    mime_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "MIME type of the file"
    }
  }, {
    tableName: "product_media",
    timestamps: true,
});

// Relationships 
Product.hasMany(ProductMedia, { foreignKey: "product_id" });
ProductMedia.belongsTo(Product, { foreignKey: "product_id" });
  
export default ProductMedia;
