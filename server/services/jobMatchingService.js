const { runPythonScript } = require('./groqService'); // Reuse the Python runner
const Job = require('../models/Job');

async function findMatchingJobs(cvData, userId) {
    try {
        // Get all active jobs
        const jobs = await Job.findAll({ 
            where: { status: 'active' },
            raw: true 
        });

        if (!jobs.length) return [];

        // Prepare jobs data for Python processing
        const jobsData = jobs.map(job => ({
            id: job.id,
            title: job.title,
            description: job.description,
            skillsRequired: job.skillsRequired || [],
            company: job.company,
            location: job.location,
            salaryRange: job.salaryRange
        }));

        // Call Python matching service
        const matches = await runPythonScript([
            'matching_service.py',
            JSON.stringify(cvData),
            JSON.stringify(jobsData)
        ]);

        // Format results with job details
        return matches.map(match => {
            const job = jobs.find(j => j.id === match.job_id);
            return {
                ...job,
                matchScore: match.match_score,
                matchingSkills: match.matching_skills
            };
        });

    } catch (error) {
        console.error('Matching error:', error);
        return [];
    }
}

module.exports = findMatchingJobs;