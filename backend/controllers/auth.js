import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const loginUser = async (req, res) => {
    // Check if req.body exists and has required fields
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const { email, password } = req.body;
    
    // Validate that email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the entered password with the stored password hash
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user.id, name: user.first_name }, "secret", { expiresIn: '24h' });
        res.status(200).json({ token });
    } catch (error) {
        console.log(error); // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};

export default loginUser;
