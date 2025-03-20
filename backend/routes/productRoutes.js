import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts
} from '../controllers/productController.js';
import {
  addProductMedia,
  deleteProductMedia,
  updateMediaSortOrder
} from '../controllers/productMediaController.js';
import authenticateJWT from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);  // Get all products (with filtering options)
router.get('/:id', getProductById);  // Get a specific product by ID

// Protected routes (seller only)
router.post('/', authenticateJWT, createProduct);  // Create a product
router.put('/:id', authenticateJWT, updateProduct);  // Update a product
router.delete('/:id', authenticateJWT, deleteProduct);  // Delete a product
router.get('/seller/my-products', authenticateJWT, getSellerProducts);  // Get seller's products

// Product media routes
router.post('/media', authenticateJWT, addProductMedia);  // Add media to a product
router.delete('/media/:id', authenticateJWT, deleteProductMedia);  // Delete media
router.put('/media/sort', authenticateJWT, updateMediaSortOrder);  // Update media sort order

export default router;