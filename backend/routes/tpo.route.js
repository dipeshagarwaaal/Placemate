const express = require('express');

// router after /tpo/
const router = express.Router();

const authenticateToken = require('../middleware/auth.middleware');


// tpo login controller
const Login = require('../controllers/TPO/tpo.login.controller');

const PostJob = require('../controllers/TPO/tpo.post-job.controller');



// login post request for student
router.post('/login', Login);


// post job listing data
router.post('/post-job', authenticateToken, PostJob);



module.exports = router;