const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: "Access token missing" });
        }
        
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid access token" });
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        next(error);
    }
};

const authMiddleware = {
    authenticateToken: exports.authenticateToken
};

module.exports = authMiddleware;