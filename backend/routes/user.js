import express from 'express';
import { getAllUsers, addUser, updateUser, deleteUser } from '../controllers/user.js';
import loginUser from '../controllers/auth.js';
import authenticateJWT from '../middlewares/authMiddleware.js';

const router = express.Router();

// public routes
router.post('/login', loginUser);
router.post('/', addUser);
router.get('/:id', getUser);
router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// CRUD routes for users (protected by JWT)
// router.get('/', authenticateJWT, getAllUsers); // Get all users (TODO: implement admin only logic)
// router.put('/:id', authenticateJWT, updateUser); // Update user
// router.delete('/:id', authenticateJWT, deleteUser); // Delete user (TODO: implement admin only logic)

export default router;