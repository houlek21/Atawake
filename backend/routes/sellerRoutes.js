import express from 'express';
import {
  getAllSellers,
  getSellerById,
  registerSellerProfile,
  getSellerByUserId,
  updateSeller,
  deleteSeller,
  
} from '../controllers/sellerController.js';


import authenticateJWT from '../middlewares/authMiddleware.js';



const router = express.Router();

//former seller
// Public routes
router.get('/', getAllSellers);
router.get('/:id', getSellerById)
router.get('/isseller/:id', getSellerByUserId)

// Protected routes (JWT required)
router.post('/', authenticateJWT, registerSellerProfile); // register seller profile
router.put('/:id', authenticateJWT, updateSeller); // Update seller details
router.delete('/:id', authenticateJWT, deleteSeller); // Delete seller account (TODO: implement active listing check before deleting)



export default router;
