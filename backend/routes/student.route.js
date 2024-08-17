const express = require('express');

// router after /student/
const router = express.Router();

const authenticateToken = require('../middleware/auth.middleware');

// student sign controller
const Signup = require('../controllers/student.signup.controller');
// student login controller
const Login = require('../controllers/student.login.controller');





// signup post request for student
router.post('/signup', Signup);

// login post request for student
router.post('/login', Login);

// home page for student
router.get('/home', authenticateToken, (req, res) => {
    res.json({
        name: `${req.user.name}`,
        email: `${req.user.email}`,
        profile: `${req.user.profilePicture}`,
    });
});

module.exports = router;