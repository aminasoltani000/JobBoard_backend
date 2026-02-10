exports.isAdmin = (req, res, next) => {
    try {
        const userRole = req.user.role;
        
        if (userRole !== 'admin') {
            return res.status(403).json({ message: "Forbidden: Admin access required" });
        }
        
        next();
    }
    catch (error) {
        next(error);
    }
};

const adminMiddleware = {
    isAdmin: exports.isAdmin
};

module.exports = adminMiddleware;