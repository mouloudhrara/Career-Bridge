const { UUID } = require("sequelize");

const jobs= [
    {id:UUID, title:'Software Engineer', description:'Develop software', skillsRequired:['JavaScript', 'Node.js'], postedBy: UUID},
    {id:UUID, title:'Frontend Developer', description:'Build user interfaces', skillsRequired:['React', 'Css'], postedBy: UUID}
];
// Create job
const createJob= (req, res)=>{
    const {title, description, skillsRequired, postedBy} = req.body;

    if(!title || !description || !skillsRequired || !postedBy){
        return res.status(400).json({error:'Missing required fields'});
    }

    const newJob= {
        id:UUID,
        title, 
        description,
        skillsRequired,
        postedBy
    };

    // add a new job
    jobs.push(newJob);
    res.status(201).json(newJob); 
};

// Update job
const updateJob= (req, res)=>{
    const {id}= req.params;
    const {title, description, skillsRequired, postedBy} = req.body;

    job = jobs.find(job => job.id===id);

    if(!job){
        return res.status(404).json({error: 'Job not found'});
    }

    job.title=title || job.title;
    job.description=description || job.description;
    job.skillsRequired=skillsRequired || job.skillsRequired;
    job.postedBy=postedBy || job.postedBy;

    res.json(job); //respond with the updated job
}

// Delete job
const deleteJob = (req, res)=> {
    const {id} = req.params;

    const job= jobs.find(job=>job.id === id);

    if(!job) {
        return res.status(404).json({error: 'Job not found'});
    }
}
