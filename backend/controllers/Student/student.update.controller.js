const User = require("../../models/user.model");
const bcrypt = require("bcrypt");


const UpdateBasicDetail = async (req, res) => {
  const { name, email, number } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ msg: "User Doesn't Exist!" });

    user.name = name;
    user.number = number;

    await user.save();

    res.json({ msg: "Data Updated!" });
  } catch (error) {
    console.log("student.update-basic-detail.controller => ", error);
  }
}

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

const UpdatePassword = async (req, res) => {
  const { oldpass, newpass } = req.body;
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.send("User Not Found!");
      return
    }

    const isMatch = await bcrypt.compare(oldpass, user.password);

    if (isMatch) {
      const hashPassword = await bcrypt.hash(newpass, 10);
      user.password = hashPassword;
      await user.save();
      res.send("Password Updated Successfully!");
    } else {
      res.send("Password Did Not Matched!");
      return;
    }
  } catch (error) {
    console.log("UpdatePassword.js => ", error)
    res.status(500).send('Server error');
  }
}

module.exports = {
  UpdateBasicDetail,
  UpdateProfile,
  UpdatePassword
};