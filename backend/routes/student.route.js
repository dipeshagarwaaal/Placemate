const express = require('express');

// router after /student/
const router = express.Router();

const authenticateToken = require('../middleware/auth.middleware');

// student sign controller
const Signup = require('../controllers/Student/signup.controller.js');
// student login controller
const Login = require('../controllers/Student/login.controller.js');
// student Update controller
const { UpdateBasicDetail, UpdatePassword, CompleteProfile } = require('../controllers/Student/update.controller.js');



// signup post request for student
router.post('/signup', Signup);

// login post request for student
router.post('/login', Login);


// update basic detail of user
router.post('/complete-profile', authenticateToken, CompleteProfile);

// update basic detail of user
router.post('/update-basic-detail', authenticateToken, UpdateBasicDetail);


// update password
router.post('/changepass', authenticateToken, UpdatePassword);


module.exports = router;