import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import authenticateJWT from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllCategories);  // Get all categories
router.get('/:id', getCategoryById);  // Get a specific category

// Protected routes (admin only)
router.post('/', authenticateJWT, createCategory);  // Create a category
router.put('/:id', authenticateJWT, updateCategory);  // Update a category
router.delete('/:id', authenticateJWT, deleteCategory);  // Delete a category

export default router;
