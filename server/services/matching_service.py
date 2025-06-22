import sys
import json
import numpy as np
from embedding_service import get_embedding
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def enhanced_similarity(cv_embedding, job_embedding, cv_skills, job_skills):
    """Improved similarity with skill weighting"""
    base_score = np.dot(cv_embedding, job_embedding) / (np.linalg.norm(cv_embedding) * np.linalg.norm(job_embedding))
    
    # Skill matching bonus (10% per matching skill)
    skill_bonus = 0.1 * len(set(cv_skills) & set(job_skills))
    
    return min(1.0, base_score + skill_bonus)

def match_jobs_to_cv(cv_data, jobs, top_n=5):
    try:
        # Enhanced text preparation
        cv_text = f"""
        Skills: {', '.join(cv_data.get('skills', []))}
        Experience: {' '.join(exp['description'] for exp in cv_data.get('experience', []))}
        """
        
        cv_embedding = np.array(get_embedding(cv_text))
        
        results = []
        for job in jobs:
            job_text = f"{job['title']} {job['description']} Skills: {', '.join(job.get('skillsRequired', []))}"
            job_embedding = np.array(get_embedding(job_text))
            
            score = enhanced_similarity(
                cv_embedding, job_embedding,
                cv_data.get('skills', []),
                job.get('skillsRequired', [])
            )
            
            results.append({
                "job_id": job["id"],
                "match_score": round(score * 100, 2),
                "matching_skills": list(set(cv_data.get('skills', [])) & set(job.get('skillsRequired', [])))})
        
        return sorted(results, key=lambda x: x["match_score"], reverse=True)[:top_n]
    
    except Exception as e:
        logger.error(f"Matching error: {str(e)}")
        return []

if __name__ == "__main__":
    try:
        # Read input from command line arguments
        cv_data = json.loads(sys.argv[1])
        jobs = json.loads(sys.argv[2])
        
        matches = match_jobs_to_cv(cv_data, jobs)
        print(json.dumps(matches))
        
    except Exception as e:
        logger.error(f"Error in matching service: {str(e)}")
        print(json.dumps([]))