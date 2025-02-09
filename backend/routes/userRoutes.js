import express from 'express';
import { getAllUsers, addUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// CRUD routes for users
router.get('/', getAllUsers);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;