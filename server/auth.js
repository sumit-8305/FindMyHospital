import jwt from 'jsonwebtoken';

// Define your secret key (use environment variables for production)
const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key';

// Function to generate a token
export function generateToken(username) {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
}

// Middleware to check authentication
export function checkAuth(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        req.user = decoded.username;  // Add the username to the request object
        next();
    });
}
