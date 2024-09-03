const express = require('express');

// router after /management/
const router = express.Router();

const authenticateToken = require('../middleware/auth.middleware');


// management login controller
const Login = require('../controllers/Management/login.controller');
// management UsersTPO controller
const UsersTPO = require('../controllers/Management/tpo-users.controller');
// management DeleteTPO controller
const DeleteTPO = require('../controllers/Management/delete-tpo.controller');
// management AddTPO controller
const AddTPO = require('../controllers/Management/add-tpo.controller');




router.post('/login', Login);

router.get('/tpo-users', authenticateToken, UsersTPO);

router.post('/deletetpo', authenticateToken, DeleteTPO);

router.post('/addtpo', authenticateToken, AddTPO);


module.exports = router;