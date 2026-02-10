const Candidature = require('../models/candidature.model');

exports.createCandidature = async (req, res) => {
    try {
        const { jobId, motivationLetter } = req.body;
        const userId = req.user.userId;
        
        // voir si postuler deja
        const existingCandidature = await Candidature.findOne({ userId, jobId });
        if (existingCandidature) {
            return res.status(400).json({ message: "You have already applied to this job" });
        }
        
        const newCandidature = await Candidature.create({ 
            userId, 
            jobId, 
            motivationLetter 
        });
        
        res.status(201).json({ 
            message: "Application submitted successfully", 
            candidature: newCandidature 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyCandidatures = async (req, res) => {
    try {
        const userId = req.user.userId;
        const candidatures = await Candidature.find({ userId })
            .populate('jobId', 'title company jobType');
        
        res.status(200).json(candidatures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllCandidatures = async (req, res) => {
    try {
        const candidatures = await Candidature.find()
            .populate('userId', 'email')
            .populate('jobId', 'title company');
        
        res.status(200).json(candidatures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCandidatureStatus = async (req, res) => {
    try {
        const candidatureId = req.params.id;
        const { status } = req.body;
        
        if (!['pending', 'accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }
        
        const updatedCandidature = await Candidature.findByIdAndUpdate(
            candidatureId,
            { status },
            { new: true }
        );
        
        if (!updatedCandidature) {
            return res.status(404).json({ message: "Application not found" });
        }
        
        res.status(200).json({ 
            message: "Application status updated successfully", 
            candidature: updatedCandidature 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const candidatureController = {
    createCandidature: exports.createCandidature,
    getMyCandidatures: exports.getMyCandidatures,
    getAllCandidatures: exports.getAllCandidatures,
    updateCandidatureStatus: exports.updateCandidatureStatus
};

module.exports = candidatureController;