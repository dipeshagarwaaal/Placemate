const Users = require('../../models/user.model');
const bcrypt = require('bcrypt');

const AddTPO = async (req, res) => {
  const { name, email, number, password } = req.body;

  try {
    if (await Users.findOne({ email }))
      return res.json({ msg: "User Already Exists!" });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({ name: name, email: email, number: number, password: hashPassword, role: "tpo_admin" });
    await newUser.save();
    res.json({ msg: "User Created!" });
  } catch (error) {
    console.log("management.add-tpo => ", error);
  }
}

module.exports = AddTPO;