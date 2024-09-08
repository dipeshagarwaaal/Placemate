const express = require('express');

// router after /tpo/
const router = express.Router();

const authenticateToken = require('../middleware/auth.middleware');


// tpo login controller
const Login = require('../controllers/TPO/tpo.login.controller');

const PostJob = require('../controllers/TPO/tpo.post-job.controller');

const { AllJobs, DeleteJob, JobData } = require('../controllers/user/user.all-jobs.controller');

// login post request for student
router.post('/login', Login);


// post job listing data
router.post('/post-job', authenticateToken, PostJob);

router.get('/jobs', AllJobs);

router.post('/delete-job', DeleteJob);

// view job 
router.get('/:jobId', authenticateToken, JobData);


module.exports = router;