import User from '../models/user.js';
import bcrypt from 'bcryptjs';

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

// Get a user by ID
export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new user
export const addUser = async (req, res) => {
  const { first_name, last_name, email, phone, address, password } = req.body;
  console.log("newuser")
  try {
    // check if the email already exists
    const existingUser = await User.findOne({ where: {email} });
    if(existingUser) {
      return res.status(400).json({ message: 'Email already is use' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // create the new user
    const newUser = await User.create({
      first_name, 
      last_name, 
      email,
      phone,
      address,
      password_hash: hashedPassword, // save the hashed password
      user_type: 'regular', // Default user type is 'regular' for new users
    });

    res.status(201).json({ message: 'User successfully created'});
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user', details: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, address, user_type } = req.body;
  try {
    // ensure target user exists before attempting an update
    const user = await User.findByPk(id);
    if(!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only Admins should be able to change the 'user_type'
    // if(user_type && req.user.user_type !== 'admin') {
    //   return res.status(403).json( { message: 'Regular users are not permitted to change the account type' });
    // }

    await user.update({ first_name, last_name, email, phone, address, user_type });
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
    
    if(!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user', details: error.message });
  }
};

// validate a user login jwt token 
export const validateToken = async (req, res) => {
  res.status(200).json({ message: "Token is valid"})
}