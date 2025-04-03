import Cart from "../models/cart.js";
import Order from "../models/order.js";
import OrderItem from "../models/orderItem.js";
import Product from "../models/product.js";
import Payment from "../models/payment.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

// Initializing Stripe with test mode API key
const stripe = new Stripe(process.env.STRIPE_TEST_KEY);

// Create checkout session and Stripe payment intent
export const createCheckoutSession = async (req, res) => {
  try {
    // Require user to be logged in
    if (!req.user) {
      return res.status(401).json({ message: "You must be logged in to checkout" });
    }
    
    const userId = req.user.id;
    const sessionId = req.cookies.cart_session_id;
    
    if (!sessionId) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    
    const { 
      shipping_address,
      contact_email,
      contact_phone
    } = req.body;
    
    // Basic validation
    if (!shipping_address || !contact_email) {
      return res.status(400).json({ 
        message: "Shipping address and contact email are required" 
      });
    }
    
    // Get cart items
    const cartItems = await Cart.findAll({
      where: { session_id: sessionId },
      include: [{ model: Product }],
    });
    
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    
    // Calculate order amounts
    let subtotal = 0;
    
    for (const item of cartItems) {
      subtotal += parseFloat(item.Product.price) * item.quantity;
    }
    
    // Apply simplified tax rate
    const taxRate = 0.05; // 5% tax
    const taxAmount = subtotal * taxRate;
    
    // Calculate total (no shipping cost)
    const total = subtotal + taxAmount;
    
    // Create order
    const order = await Order.create({
      user_id: userId,
      subtotal_amount: subtotal,
      tax_amount: taxAmount,
      total_amount: total,
      order_status: "pending",
      shipping_address,
      contact_email,
      contact_phone
    });
    
    // Create order items
    for (const item of cartItems) {
      await OrderItem.create({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: item.Product.price
      });
    }
    
    // Create Stripe payment intent using test mode
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Stripe uses cents
      currency: 'usd',
      metadata: {
        order_id: order.id,
        user_id: userId,
      },
      // Test mode specific configurations
      payment_method_types: ['card'],
      receipt_email: contact_email
    });
    
    // Save payment intent ID to order
    await order.update({ payment_intent_id: paymentIntent.id });
    
    // Return the client secret for frontend
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
      testMode: true
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      message: "Error creating checkout session",
      error: error.message
    });
  }
};

// Process successful payment
export const processPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    
    if (!paymentIntentId) {
      return res.status(400).json({ message: "Payment intent ID is required" });
    }
    
    // for test mode, retrieve the intent to check its status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['payment_method', 'charges.data']
    });
    
    // Find the order
    const order = await Order.findOne({
      where: { payment_intent_id: paymentIntentId }
    });
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // Update order status based on payment intent status
    let orderStatus = "pending";
    let paymentStatus = "pending";
    
    if (paymentIntent.status === 'succeeded') {
      orderStatus = "payment_completed";
      paymentStatus = "completed";
    } else if (paymentIntent.status === 'processing') {
      orderStatus = "payment_processing";
      paymentStatus = "processing";
    } else if (paymentIntent.status === 'requires_payment_method') {
      orderStatus = "pending";
      paymentStatus = "failed";
    }
    
    // Update order
    await order.update({ order_status: orderStatus });
    
    // Extract card details if available
    let cardBrand = null;
    let cardLast4 = null;
    let paymentMethodId = null;
    let receiptUrl = null;
    
    if (paymentIntent.payment_method) {
      paymentMethodId = paymentIntent.payment_method.id;
      
      if (paymentIntent.payment_method.card) {
        cardBrand = paymentIntent.payment_method.card.brand;
        cardLast4 = paymentIntent.payment_method.card.last4;
      }
    }
    
    // Get receipt URL if available
    if (paymentIntent.charges && 
        paymentIntent.charges.data && 
        paymentIntent.charges.data.length > 0) {
      receiptUrl = paymentIntent.charges.data[0].receipt_url;
    }
    
    // Create payment record with Stripe details
    await Payment.create({
      order_id: order.id,
      user_id: order.user_id,
      payment_method: "credit_card",
      payment_status: paymentStatus,
      stripe_payment_intent_id: paymentIntentId,
      stripe_payment_method_id: paymentMethodId,
      card_brand: cardBrand,
      card_last4: cardLast4,
      amount: order.total_amount,
      receipt_url: receiptUrl
    });
    
    // If payment was successful, clear cart and update inventory
    if (orderStatus === "payment_completed") {
      // Clear cart
      const sessionId = req.cookies.cart_session_id;
      if (sessionId) {
        await Cart.destroy({
          where: { session_id: sessionId }
        });
      }
      
      // Update product inventory
      const orderItems = await OrderItem.findAll({
        where: { order_id: order.id },
        include: [{ model: Product }]
      });
      
      for (const item of orderItems) {
        const newQuantity = item.Product.quantity - item.quantity;
        await item.Product.update({ quantity: Math.max(0, newQuantity) });
      }
    }
    
    res.status(200).json({
      message: "Payment processed",
      order_id: order.id,
      status: orderStatus,
      receipt_url: receiptUrl
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      message: "Error processing payment",
      error: error.message
    });
  }
};

// Get order details
export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user ? req.user.id : null;
    
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    // Find order
    const order = await Order.findOne({
      where: { 
        id: orderId,
        user_id: userId // Ensure user owns this order
      },
      include: [
        { 
          model: OrderItem,
          include: [{ model: Product }]
        },
        {
          model: Payment
        }
      ]
    });
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving order details",
      error: error.message
    });
  }
};
