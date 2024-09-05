const express = require('express');

// router after /student/
const router = express.Router();

const authenticateToken = require('../middleware/auth.middleware');

// student sign controller
const Signup = require('../controllers/Student/signup.controller.js');
// student login controller
const Login = require('../controllers/Student/login.controller.js');




// signup post request for student
router.post('/signup', Signup);

// login post request for student
router.post('/login', Login);




module.exports = router;