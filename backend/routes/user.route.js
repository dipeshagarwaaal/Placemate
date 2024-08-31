const express = require('express');

// router after /student/
const router = express.Router();

const authenticateToken = require('../middleware/auth.middleware');

// details of users student
router.get('/detail', authenticateToken, (req, res) => {
    res.json({
        name: `${req.user.name}`,
        email: `${req.user.email}`,
        number: `${req.user.number}`,
        password: `${req.user.password}`,
        profile: `${req.user.profile}`,
        enrollmentNumber: `${req.user.studentProfile.enrollmentNumber}`,
        department: `${req.user.studentProfile.department}`,
        year: `${req.user.studentProfile.year}`,
        createdAt: `${req.user.createdAt}`,
        id: `${req.user.id}`,
        role: `${req.user.role}`,
    });
});


module.exports = router;