const express = require('express');

// router after /student/
const router = express.Router();


// student sign controller
const Signup = require('../controllers/student.signup.controller');
// student login controller
const Login = require('../controllers/student.login.controller');





// signup post request for student
router.post('/signup', Signup);

// login post request for student
router.post('/login', Login);

module.exports = router;