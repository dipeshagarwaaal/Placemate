const User = require('../../models/user.model');

const userData = async (req, res) => {
  const { userId } = req.params;
  // console.log(userId);
  try {
    // Fetch user details from the database
    const user = await User.findById(userId);
    // console.log(user)
    // Check if user exists
    if (!user)
      return res.status(404).json({ msg: 'Student not found' });

    // Return the user details
    res.json(user);
  } catch (error) {
    // checking if userId is exist or not
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'user not found' });
    }
    console.error('Error fetching user details:', error);
    res.status(500).json({ msg: 'Server error' });
  }
}


module.exports = userData;