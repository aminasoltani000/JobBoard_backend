const Job = require('../models/job.model');

exports.createJob = async (req, res) => {
    try {
        const { title, company, description, jobType } = req.body;
        
        const newJob = await Job.create({ 
            title, 
            company, 
            description, 
            jobType 
        });
        
        res.status(201).json({ 
            message: "Job created successfully", 
            job: newJob 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const jobId = req.params.id; //id du job 
        const job = await Job.findById(jobId);
        
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { title, company, description, jobType } = req.body;
        
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { title, company, description, jobType },
            { new: true }
        );
        
        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        
        res.status(200).json({ 
            message: "Job updated successfully", 
            job: updatedJob 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        
        const deletedJob = await Job.findByIdAndDelete(jobId);
        
        if (!deletedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const jobController = {
    createJob: exports.createJob,
    getAllJobs: exports.getAllJobs,
    getJobById: exports.getJobById,
    updateJob: exports.updateJob,
    deleteJob: exports.deleteJob
};

module.exports = jobController;