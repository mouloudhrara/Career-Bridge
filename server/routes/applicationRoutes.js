const express = require('express');
const router = express.Router();
const { applyForJob, getUserApps, getJobApps, getAllApplications } = require('../controllers/applicationController');
const requireAuth = require('../middlewares/requireAuth');
const isAdmin = require('../middlewares/isAdmin');

// All routes require authentication
router.use(requireAuth);

// User applies to job
router.post('/:jobId/apply', applyForJob);
// User views their applications
router.get('/my-applications', getUserApps);

// Admin views applications for a specific job only admin routes
router.get('/admin', isAdmin, getAllApplications); 

module.exports = router;