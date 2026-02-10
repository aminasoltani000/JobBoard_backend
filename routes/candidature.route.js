const express = require('express');
const candidatureController = require('../controllers/candidature.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const router = express.Router();

router.post('/', 
    authMiddleware.authenticateToken, 
    candidatureController.createCandidature
);

router.get('/me', 
    authMiddleware.authenticateToken, 
    candidatureController.getMyCandidatures
);

router.get('/', 
    authMiddleware.authenticateToken, 
    adminMiddleware.isAdmin, 
    candidatureController.getAllCandidatures
);

router.put('/:id/status', 
    authMiddleware.authenticateToken, 
    adminMiddleware.isAdmin, 
    candidatureController.updateCandidatureStatus
);

module.exports = router;