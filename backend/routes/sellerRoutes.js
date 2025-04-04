import express from 'express';
import {
  getAllSellers,
  getSellerById,
  getSellerByUserId,
  registerSellerProfile,
  updateSeller,
  deleteSeller,
  uploadProfileImage,
  deleteProfileImage
} from '../controllers/sellerController.js';
import authenticateJWT from '../middlewares/authMiddleware.js';
import { uploadSellerImage } from '../utils/fileUpload.js';

const router = express.Router();

// Public routes
router.get('/', getAllSellers);
router.get('/:id', getSellerById);
router.get('/isseller/:id', getSellerByUserId) // -- M

// Protected routes (JWT required)
router.post('/', authenticateJWT, registerSellerProfile); // register seller profile
router.put('/:id', authenticateJWT, updateSeller); // Update seller details
router.delete('/:id', authenticateJWT, deleteSeller); // Delete seller account

// Profile image routes
router.post('/:id/profile-image', authenticateJWT, uploadSellerImage.single('image'), uploadProfileImage);
router.delete('/:id/profile-image', authenticateJWT, deleteProfileImage);

export default router;
