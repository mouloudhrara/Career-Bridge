const {Job} = require('../models/Job');
const { getJobSuggestions } = require('./groqService.js');


async function findMatchingJobs( cvData, userId){
    try {
        // fetching all active jobs from database
        const jobs= await Job.findAll({
            where : {
                status: 'actif'
            },
            raw: true
        });
        if(!jobs || jobs.length===0){
            return [];
        }
        // prepare job listings for the LLM
        const jobListings = jobs.map(job=> ({
            id: job.id,
            title:job.title,
            description: job.description,
            required_skills: job.skillsRequired,
            posted_by: job.postedBy
        }));

        // Get AI-powered suggestions 
        const matchedJobs= await getJobSuggestions(cvData, jobListings);
        // Enrich with full job details 
        return matchedJobs.map(suggestion => {
            const job = jobs.find(j=> j.id === suggestion.job_id);
            return {
                ...suggestion,
                ...job
            };
        });
    }catch(error){
        console.error('Error in findMatchingJobs', error);
        throw error;
    }
}

module.exports=findMatchingJobs;