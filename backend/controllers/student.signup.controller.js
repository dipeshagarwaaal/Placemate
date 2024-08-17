const StudentUser = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const name = first_name + " " + last_name;

  try {
    if (await StudentUser.findOne({ email }))
      return res.status(400).json({ msg: "User Already Exists!" });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new StudentUser({ name: name, email: email, password: hashPassword, role:"student" });
    await newUser.save();
    res.json({ msg: "User Created!" });
  } catch (error) {
    console.log("student.signup.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

module.exports = Signup;