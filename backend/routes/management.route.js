const express = require('express');

// router after /management/
const router = express.Router();

const authenticateToken = require('../middleware/auth.middleware');


// management login controller
const Login = require('../controllers/management.login');
// management UsersTPO controller
const UsersTPO = require('../controllers/management.tpo-users');
// management DeleteTPO controller
const DeleteTPO = require('../controllers/management.delete-tpo');
// management AddTPO controller
const AddTPO = require('../controllers/management.add-tpo');




router.post('/login', Login);

router.get('/tpo-users', authenticateToken, UsersTPO);

router.post('/deletetpo', authenticateToken, DeleteTPO);

router.post('/addtpo', authenticateToken, AddTPO);


module.exports = router;