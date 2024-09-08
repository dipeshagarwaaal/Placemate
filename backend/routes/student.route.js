const express = require('express');

// router after /student/
const router = express.Router();

// import multer for student resume upadate 
const uploadResume = require('../config/MulterResume.js');

const authenticateToken = require('../middleware/auth.middleware');

// student sign controller
const Signup = require('../controllers/Student/signup.controller.js');
// student login controller
const Login = require('../controllers/Student/login.controller.js');

const UploadResume = require('../controllers/Student/resume.controller.js');

// signup post request for student
router.post('/signup', Signup);

// login post request for student
router.post('/login', Login);


// Route to upload resume
router.post('/upload-resume', uploadResume.single('resume'), UploadResume);




module.exports = router;