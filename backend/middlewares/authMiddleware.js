import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
       if(err) {
        return res.status(403).json({ message: 'Invalid token' });
       }

       try {
        const user = await User.findByPk(decoded.id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user; // Attach user to the request object
        next();
       } catch (error) {
        console.error(error); // log the error for debugging
        res.status(500).json({ message: 'Server error' });
       }
    });
};

export default authenticateJWT;
