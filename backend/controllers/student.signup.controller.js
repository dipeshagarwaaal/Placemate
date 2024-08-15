const StudentUser = require("../models/student.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    if (await StudentUser.findOne({ email }))
      return res.status(400).json({ msg: "User Already Exists!" });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new StudentUser({ first_name, last_name, email, password: hashPassword });
    await newUser.save();

    const payload = { userId: newUser.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.log("student.signup.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

module.exports = Signup;