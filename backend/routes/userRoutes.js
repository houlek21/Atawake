import express from 'express';
import { getAllUsers, getUser, addUser, updateUser, deleteUser, validateToken } from '../controllers/userController.js';
import loginUser from '../controllers/auth.js';
import authenticateJWT from '../middlewares/authMiddleware.js';

const router = express.Router();

// public routes
router.post('/login', loginUser);
router.post('/', addUser);
router.get('/', getAllUsers);
router.get('/validate-token', authenticateJWT, validateToken);

router.get('/:id', getUser);
router.delete('/:id', deleteUser);

// CRUD routes for users (protected by JWT)
// router.get('/', authenticateJWT, getAllUsers); // Get all users (TODO: implement admin only logic)
router.put('/:id', authenticateJWT, updateUser); // Update user
// router.delete('/:id', authenticateJWT, deleteUser); // Delete user (TODO: implement admin only logic)


export default router;
