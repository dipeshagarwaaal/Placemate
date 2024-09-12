const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

// get management user
const managementUsers = async (req, res) => {
  const managementUsers = await User.find({ role: "management_admin" });
  res.json({ managementUsers });
}

const managementAddUsers = async (req, res) => {
  const email = req.body.email;

  try {
    if (await User.findOne({ email }))
      return res.json({ msg: "User Already Exists!" });

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({ first_name: req.body.first_name, email: req.body.email, number: req.body.number, password: hashPassword, role: "management_admin" });
    await newUser.save();
    res.json({ msg: "User Created!" });
  } catch (error) {
    console.log("admin.user-management => ", error);
  }
}

const managementDeleteUsers = async (req, res) => {
  // const user = await Users.find({email: req.body.email});
  const ress = await User.deleteOne({ email: req.body.email });
  if (ress.acknowledged) {
    res.json({ msg: "User Deleted Successfully!" });
  } else {
    res.json({ msg: "Error While Deleting User!" });
  }
}


module.exports = {
  managementUsers,
  managementAddUsers,
  managementDeleteUsers
};