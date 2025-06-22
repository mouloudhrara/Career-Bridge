const {Application, User, Job }=require("../models/Application");

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
    const {job} = await Job.findOne({
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
        // These will be auto-populated by the hook, but you can override:
        applicant_first_name: user.firstName,
        applicant_last_name: user.lastName,
        applicant_email: user.email,
        applicant_phone: user.phone,
        cv_path: user.cvPath
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
getUserApps = async (req, res)=>{
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
            jobTitle:job.title,
            total:applications.count,
            applications:applications.rows
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
const getJobApps= async (req, res)=> {
    try{
        const {jobId}= req.params;
        const {status} = req.query;
        const userId = req.user.id;


        // check if the job exists and the use has permission
        const job = await Job.findByPk(jobId);
        if(!job){
            return res.status(404).json({ error: 'Job not found'});
        }
        // check if user is admin or jobPoster
        const isAdmin = req.user.role === 'admin';
        const isJobOwner = job.postedBy=== userId;

        if(!isAdmin && !isJobOwner){
            return res.status(403).json({
                error: 'Not authorized to view these applications'
            });
        }

        const whereClause = {job_id : jobId};
        if( status) whereClause.status=  status;
        const applications = await Application.findAndCountAll({
            where: whereClause,
            include:[{
                model:User,
                as: 'applicant',
                attributes:['id','firstName','lastName', 'email', 'phone']
            }],
            order:[['applied_at', 'DESC']]
        });

        res.json({
            jobTitle:job.title,
            total:applications.count,
            applications:applications.rows
        });
    }catch(error){
        res.status(500).json({
            error:'Failed to fetch job applications',
            details: error.message
        });
    }
};




module.exports={
    applyForJob,
    getJobApps
};