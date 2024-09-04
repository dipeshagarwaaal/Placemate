const User = require("../../models/user.model");


const UpdateProfile = async (req, res) => {
    const file = req.file;
  
    if (!file) return res.status(400).json({ msg: 'No file uploaded.' });
  
    try {
      // retrive user
      const userId = req.body.userId;
  
      // Update the user with the new profile photo filename
      const user = await User.findById(userId);
      user.profile = "/" + file.fieldname + "/" + file.filename;
      await user.save();
  
      res.status(201).json({ msg: "Profile Picture Updated Successfully!", file: user.profile });
    } catch (error) {
      console.error('Error saving to database:', error);
      res.status(500).send('Server error');
    }
  }


  module.exports = UpdateProfile;