import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticateJWT = (req, res, next) => {
    
    console.log(req.headers['authorization'],'auth')
    
    //not work?
    //const token = req.header('Authorization')?.replace('Bearer ', '');  
    const token = req.headers['authorization']

    if(!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    //process.env.JWT_SECRET ->secret, cause issue
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
       if(err) {
        return res.status(403).json({ message: 'Invalid token - Please Login Again' });
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

// middleware for optional authentication
const optionalAuthJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // If no token, just continue as guest
    if(!token) {
        return next();
    }
    
    // Try to verify token, but don't block if it fails
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if(err) {
            // Token invalid, but we'll still continue as guest
            console.log('Invalid token in optional auth:', err.message);
            return next();
        }
        
        try {
            const user = await User.findByPk(decoded.id);
            if(user) {
                req.user = user; // Attach user to request if found
            }
            // Continue regardless of whether user was found
            next();
        } catch (error) {
            console.error('Error in optional auth:', error);
            // Continue as guest even if there was an error
            next();
        }
    });
};

export { authenticateJWT, optionalAuthJWT };
export default authenticateJWT;
