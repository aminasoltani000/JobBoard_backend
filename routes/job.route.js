  const express = require('express');
const jobController = require('../controllers/job.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const router = express.Router();

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);

router.post('/', 
    authMiddleware.authenticateToken, 
    adminMiddleware.isAdmin, 
    jobController.createJob
);

router.put('/:id', 
    authMiddleware.authenticateToken, 
    adminMiddleware.isAdmin, 
    jobController.updateJob
);

router.delete('/:id', 
    authMiddleware.authenticateToken, 
    adminMiddleware.isAdmin, 
    jobController.deleteJob
);

module.exports = router;