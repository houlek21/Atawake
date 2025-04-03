import express from "express";
import { 
  createCheckoutSession, 
  processPayment, 
  getOrderDetails 
} from "../controllers/checkoutController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";

const router = express.Router();

// Checkout requires authentication
router.post("/create-session", authenticateJWT, createCheckoutSession);
router.post("/process-payment", authenticateJWT, processPayment);
router.get("/order/:orderId", authenticateJWT, getOrderDetails);

export default router;