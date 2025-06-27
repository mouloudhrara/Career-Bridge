const db = require("../models");
const Job= db.Job;
const User = db.User;
const Application=db.Application;

const applyForJob= async (req, res)=>{
    try{
            const {jobId} = req.params;
            const userId = req.user.id;

    // check if the user exists and has a CV uploaded 
    const user= await User.findByPk(userId);
    if(!user){
        return res.status(404).json({
            error:'user not found'
        });
    }
    if(!user.cvPath){
        return res.status(404).json({
            error: 'No CV found. Please upload your CV before applying.'
        })
    }

    //check if job exists and active 
    const job = await Job.findOne({
        where:{
            id:jobId,
            status: 'active'
        }
    });
    if(!job){
        return res.status(404).json({
            error: 'Job not found or no longer accepting applications'
        });
    }
    // check for existing app
    const existingApp= await Application.findOne({
        where: {
            user_id:userId,
            job_id: jobId
        }
    });
    if(existingApp){
        return res.status(409).json({
            error: 'You have already applied to this position'
        });
    }
    // Create the application 
    const application = await Application.create({
        job_id:jobId,
        user_id:userId,
        cv_path: user.cvPath,
        // Other fields will be auto-populated by the hook:
        ...req.body // overriding auto-populated fields
        
    });
    res.status(201).json({
        message:'Application submitted successfully'
        ,application});
    } catch(error){
        res.status(500).json({
            error:'Application failed',
            details: error.message
        });
    }
};

// get all applications (user)
const getUserApps = async (req, res)=>{
    try{
        const userId= req.user.id;
        const {status} = req.query;
        const whereClause = {user_id: userId};
        if(status){
            whereClause.status=status;
        }

        const applications=  await Application.findAndCountAll({
            where:whereClause,
            include:[{
                model:Job, 
                as: 'job',
                attributes:['id', 'title', 'company']
            }],
            order:[['applied_at', 'DESC']]
        });

            res.json({
                total: applications.count,
                applications: applications.rows
            });
    }
    catch(error){
        res.status(500).json({
            error: 'Failed to fetch job applications',
            details: error.message
        });
    }
};

// get job applications (admin)
const getAllApplications = async (req, res) => {
    try {
        const { status } = req.query;
        
        const whereClause = {};
        if (status) whereClause.status = status;

        const applications = await Application.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'applicant',
                    attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
                },
                {
                    model: Job,
                    as: 'job',
                    attributes: ['id', 'title', 'company']
                }
            ],
            order: [['applied_at', 'DESC']]
        });

        res.json({
            total: applications.count,
            applications: applications.rows
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch applications',
            details: error.message
        });
    }
};


module.exports={
    applyForJob,
    getAllApplications,
    getUserApps
};