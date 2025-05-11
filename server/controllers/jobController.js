const Job=require('../models/Job');
// Create job
const createJob= async (req, res)=>{
    const {title, description, skillsRequired, postedBy} = req.body;

    if(!title || !description || !skillsRequired || !postedBy){
        return res.status(400).json({error:'Missing required fields'});
    }
    try {
        const job= await Job.create({
        title, 
        description,
        skillsRequired,
        postedBy
    });
    res.status(201).json(job); 
    } catch(err){
        res.status(500).json({error: 'Failed to create job', details: err.message});
    }
};

// Update job
const updateJob= async (req, res)=>{
    const {id}= req.params;
    const {title, description, skillsRequired, postedBy} = req.body;

    try{
        const job = await Job.findByPk(id);
        if(!job){
        return res.status(404).json({error: 'Job not found'});
        }
        await job.update({
            title:title || job.title,
            description:description || job.description,
            skillsRequired:skillsRequired || job.skillsRequired,
            postedBy:postedBy || job.postedBy,
        })
        res.json(job);
    } catch(err){
        console.error(err);
        res.status(500).json({err : 'Failed to update job'});
    }
}

// Delete job
const deleteJob = async (req, res)=> {
    const {id} = req.params;
    try {
        const job= await Job.findByPk(id);
        if(!job) {
        return res.status(404).json({error: 'Job not found'});
    }
    await job.destroy();
    res.status(200).json({message: 'Job deleted successfully'});
    } catch(err){
        res.status(500).json({err: 'Failed to delete job'});
    }
    
};
// get jobs
const getJobs = async (req, res)=>{
    try{
        const jobs=Job.findAll();
        res.json(jobs);
    } catch(err){
        res.status(500).json({error: 'Failed to fetch jobs'});
    }
};

module.exports= {
    createJob, 
    updateJob,
    deleteJob,
    getJobs
}
