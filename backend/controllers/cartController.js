import Cart from "../models/cart.js";
import Product from "../models/product.js";
import ProductMedia from "../models/productMedia.js";
import Category from "../models/category.js";
import Seller from "../models/seller.js";      
import { v4 as uuidv4 } from "uuid";

// Helper to ensure a session ID exists
const ensureSessionId = (req, res) => {
  let sessionId = req.cookies.cart_session_id;
  
  if (!sessionId) {
    sessionId = uuidv4();
    // Set cookie that expires in 30 days
    res.cookie('cart_session_id', sessionId, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    });
  }
  
  return sessionId;
};

// Update user_id on existing cart when user logs in
export const updateCartUserId = async (req, res) => {
  try {
    const sessionId = req.cookies.cart_session_id;
    
    if (!sessionId || !req.user) {
      return res.status(400).json({ message: "Invalid request" });
    }
    
    // Update all cart items for this session with the user ID
    await Cart.update(
      { user_id: req.user.id },
      { where: { session_id: sessionId } }
    );
    
    res.status(200).json({ message: "Cart updated with user ID" });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const sessionId = req.cookies.cart_session_id;
    
    if (!sessionId) {
      return res.status(200).json({ cartItems: [], subtotal: "0.00", total: "0.00" });
    }
    
    const cartItems = await Cart.findAll({
      where: { session_id: sessionId },
      include: [{ 
        model: Product,
        include: [
          {
            model: ProductMedia,
            required: false,
            limit: 1, // Only get 1 image
            order: [['sort_order', 'ASC']]
          },
          {
            model: Category,
            attributes: ['id', 'category_name']
          },
          {
            model: Seller,
            attributes: ['id', 'business_name', 'profile_image']
          }
        ]
      }]
    });

    // Format cart items with product details
    let total = 0;
    
    const cartDetails = cartItems.map(item => {
      const product = item.Product;
      const itemSubtotal = parseFloat(product.price) * item.quantity;
      
      total += itemSubtotal;
      
      const productJson = product.toJSON();
      
      // Add image URL
      let image_url = null;
      if (productJson.ProductMedia && productJson.ProductMedia.length > 0) {
        image_url = `${req.protocol}://${req.get('host')}/${productJson.ProductMedia[0].file_path.replace(/\\/g, '/')}`;
      }
      
      // Add seller name and image
      let seller_name = null;
      let seller_image = null;
      if (productJson.Seller) {
        seller_name = productJson.Seller.business_name;
        if (productJson.Seller.profile_image) {
          seller_image = `${req.protocol}://${req.get('host')}/${productJson.Seller.profile_image.replace(/\\/g, '/')}`;
        }
      }
      
      // Add category name
      let category_name = null;
      if (productJson.Category) {
        category_name = productJson.Category.category_name;
      }
      
      return {
        product_id: product.id,
        product_name: product.name,
        description: product.description,
        price: product.price,
        quantity: item.quantity,
        subtotal: itemSubtotal.toFixed(2),
        is_active: product.is_active,
        seller_id: product.seller_id,
        stock_available: product.quantity,
        category_id: product.category_id,
        image_url: image_url,
        seller_name: seller_name,
        seller_image: seller_image,
        category_name: category_name
      };
    });

    res.status(200).json({ 
      cartItems: cartDetails, 
      subtotal: total.toFixed(2),
      total: total.toFixed(2)
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Error retrieving cart", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const sessionId = ensureSessionId(req, res);

    if (!product_id || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    // Check if product exists and is active
    const product = await Product.findOne({
      where: { id: product_id, is_active: true },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found or unavailable" });
    }

    // Check if product has enough inventory
    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Not enough inventory available" });
    }

    // Add user_id if user is logged in
    const userId = req.user ? req.user.id : null;

    // Find or create cart item
    const [cartItem, created] = await Cart.findOrCreate({
      where: { session_id: sessionId, product_id },
      defaults: { quantity, user_id: userId },
    });

    if (!created) {
      // Update quantity if item already in cart
      cartItem.quantity = parseInt(quantity);
      await cartItem.save();
    }

    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const sessionId = req.cookies.cart_session_id;

    if (!sessionId) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (!product_id || !quantity) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    // Check if product exists and has sufficient stock
    const product = await Product.findOne({
      where: { id: product_id, is_active: true },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (quantity > 0 && product.quantity < quantity) {
      return res.status(400).json({ message: "Not enough inventory available" });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      await Cart.destroy({
        where: { session_id: sessionId, product_id },
      });
      return res.status(200).json({ message: "Item removed from cart" });
    }

    // Update quantity
    const updated = await Cart.update(
      { quantity },
      { where: { session_id: sessionId, product_id } }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart item updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { product_id } = req.params;
    const sessionId = req.cookies.cart_session_id;

    if (!sessionId) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deleted = await Cart.destroy({
      where: { session_id: sessionId, product_id },
    });

    if (deleted === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const sessionId = req.cookies.cart_session_id;

    if (!sessionId) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await Cart.destroy({
      where: { session_id: sessionId },
    });

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error: error.message });
  }
};
