import User from '../models/userModel.js';

// Get all users
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);  // Log the full error
      res.status(500).json({ error: 'Failed to fetch users', details: error.message });
    }
};

// Add a new user
export const addUser = async (req, res) => {
  const { first_name, last_name, email, phone, address } = req.body;
  try {
    const newUser = await User.create({ first_name, last_name, email, phone, address });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user', details: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, address } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update({ first_name, last_name, email, phone, address });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user', details: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user', details: error.message });
  }
};
