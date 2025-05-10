const express=require('express');
const router=express.Router();
const {createJob, updateJob, deleteJob, getJobs}= require('../controllers/jobController');
const requireAuth = require('../middlewares/requireAuth');
const isAdmin = require('../middlewares/isAdmin');

// require authentication
router.use(requireAuth);
// don't require admin access
router.get('/', getJobs);

// require admin access
router.use(isAdmin)
// Routes
router.post('/', createJob );
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports=router;