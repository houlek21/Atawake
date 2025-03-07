import express from "express";
import { addProduct, getProducts } from "../controllers/productController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to add a product (only authenticated users can add products)
router.post("/", authenticateJWT, addProduct);

// Route to get all products
router.get("/", getProducts);

export default router;