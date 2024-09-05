const User = require('../../models/user.model');
const bcrypt = require('bcrypt');

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

module.exports = UpdatePassword;