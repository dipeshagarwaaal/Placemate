const User = require("../../models/user.model");
const bcrypt = require("bcrypt");


const UpdateBasicDetail = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ msg: "User Doesn't Exist!" });

    user.first_name = req.body.first_name;
    user.middle_name = req.body.middle_name;
    user.last_name = req.body.last_name;
    user.number = req.body.number;

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

const CompleteProfile = async (req, res) => {
  const email = req.body.email;
  const uin = req.body.uin;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "User Doesn't Exist!" });


    if (uin !== undefined)  {
      if (await User.findOne({ uin }))
        return res.status(400).json({ msg: "UIN is Already Exist, Please Enter Correct UIN!" });
    }
      
    user.first_name = req.body.first_name;
    user.middle_name = req.body.middle_name;
    user.last_name = req.body.last_name;
    user.number = req.body.number;
    user.gender = req.body.gender;
    user.dateOfBirth = req.body.dateOfBirth;
    user.profile = req.body.profile;
    user.fullAddress.address = req.body.address;
    user.fullAddress.pincode = req.body.pincode;

    if (user.role === "student") {
      user.studentProfile.rollNumber = req.body.rollNumber;
      user.studentProfile.UIN = req.body.uin;
      user.studentProfile.department = req.body.department;
      user.studentProfile.year = req.body.year;
      user.studentProfile.addmissionYear = req.body.addmissionYear;
      user.studentProfile.SGPA.sem1 = req.body.sem1;
      user.studentProfile.SGPA.sem2 = req.body.sem2;

      if (req.body.sem3 !== "undefined")
        user.studentProfile.SGPA.sem3 = req.body.sem3;
      if (req.body.sem4 !== "undefined")
        user.studentProfile.SGPA.sem4 = req.body.sem4;
      if (req.body.sem5 !== "undefined")
        user.studentProfile.SGPA.sem5 = req.body.sem5;
      if (req.body.sem6 !== "undefined")
        user.studentProfile.SGPA.sem6 = req.body.sem6;
      if (req.body.sem7 !== "undefined")
        user.studentProfile.SGPA.sem7 = req.body.sem7;
      if (req.body.sem8 !== "undefined")
        user.studentProfile.SGPA.sem8 = req.body.sem8;
      user.studentProfile.pastQualification.ssc.board = req.body.sscBoard;
      user.studentProfile.pastQualification.ssc.year = req.body.sscPassingYear;
      user.studentProfile.pastQualification.ssc.percentage = req.body.sscPercentage;
      if (req.body.hscBoard !== "undefined") {
        user.studentProfile.pastQualification.hsc.board = req.body.hscBoard;
        user.studentProfile.pastQualification.hsc.year = req.body.hscPassingYear;
        user.studentProfile.pastQualification.hsc.percentage = req.body.hscPercentage;
      }
      if (req.body.diplomaBoard !== "undefined") {
        user.studentProfile.pastQualification.diploma.department = req.body.diplomaBoard;
        user.studentProfile.pastQualification.diploma.year = req.body.diplomaPassingYear;
        user.studentProfile.pastQualification.diploma.percentage = req.body.diplomaPercentage;
      }
    }

    user.isProfileCompleted = true;

    await user.save();

    res.json({ msg: "Success" });
  } catch (error) {
    console.log("student.update.controller => CompletProfile ==> ", error)
  }
}

module.exports = {
  UpdateBasicDetail,
  UpdatePassword,
  CompleteProfile
};