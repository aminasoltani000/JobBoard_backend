const Job = require('../models/job.model');
const Candidature = require('../models/candidature.model');

exports.getDashboard = async (req, res) => {
    try {
        // Nombre total de jobs
        const totalJobs = await Job.countDocuments();
        
        // Nombre total de candidatures
        const totalCandidatures = await Candidature.countDocuments();
        
        // Nombre de candidatures en attente
        const pendingCandidatures = await Candidature.countDocuments({ status: 'pending' });
        
        // Nombre de candidatures acceptées
        const acceptedCandidatures = await Candidature.countDocuments({ status: 'accepted' });
        
        // Nombre de candidatures rejetées
        const rejectedCandidatures = await Candidature.countDocuments({ status: 'rejected' });
        
       
        
        res.status(200).json({
            totalJobs,
            totalCandidatures,
            pendingCandidatures,
            acceptedCandidatures,
            rejectedCandidatures,
            // recentCandidatures
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const adminController = {
    getDashboard: exports.getDashboard
};

module.exports = adminController;