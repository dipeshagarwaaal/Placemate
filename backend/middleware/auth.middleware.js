const jwt = require('jsonwebtoken');
const StudentUser = require('../models/user.model');

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  // console.log(token);
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user with the matching token
    const user = await StudentUser.findOne({ _id: decoded.userId, token });
    
    if (!user) return res.status(401).json({ msg: 'Token is not valid' });
    // console.log(user);
    
    req.user = user;
    next();
  } catch (error) {
    console.log("auth.middleware.js => ", error);
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = authenticateToken;
