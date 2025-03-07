import Product from "../models/product.js";

// Create a new product
export const addProduct = async (req, res) => {
  try {
    const { seller_id, name, description, price, category_id } = req.body;
    const newProduct = await Product.create({
      seller_id,
      name,
      description,
      price,
      category_id,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};
