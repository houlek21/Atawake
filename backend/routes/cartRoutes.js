import express from "express";
import { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart,
  updateCartUserId
} from "../controllers/cartController.js";
import { authenticateJWT, optionalAuthJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Cart routes are accessible to everyone
router.get("/", getCart);
router.post("/add", optionalAuthJWT, addToCart);
router.put("/update", updateCartItem);
router.delete("/remove/:product_id", removeFromCart);
router.delete("/clear", clearCart);

// Update cart with user ID after login
router.post("/update-user", authenticateJWT, updateCartUserId);

export default router;
