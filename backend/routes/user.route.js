const express = require('express');
const User = require('../models/user.model');

// router after /user/
const router = express.Router();

// import multer for user profile update 
const uploadUserProfile = require('../config/Multer.js')

const authenticateToken = require('../middleware/auth.middleware');

// users controller methods
const UserDetail = require('../controllers/user/user.detail');
const AllUsers = require('../controllers/user/user.all-users');
const UpdateProfile = require('../controllers/user/user.update-profile')

// details of users student
router.get('/detail', authenticateToken, UserDetail);

router.get('/all-users', AllUsers);

router.post('/upload-photo', uploadUserProfile.single('profileImgs'), UpdateProfile);


module.exports = router;