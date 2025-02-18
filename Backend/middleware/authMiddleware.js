import { verifyToken } from '../controller/userController.js';

const authenticateJWT = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assumes the token is in the "Authorization" header as "Bearer <token>"
    
    if (!token) {
        return res.status(403).json({ message: 'Token is required for authentication' });
    }

    try {
        const decoded = await verifyToken(token, 'yourSecretKey');
        req.user = decoded; // Attach decoded token to the request object (for use in routes)
        next(); // Move to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

export default authenticateJWT;
