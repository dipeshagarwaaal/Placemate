const User = require("../../models/user.model");

// update any user data by admin
const UpdateProfile = async (req, res) => {
  const email = req.body.email;
  const uin = req.body.uin;
  // console.log("hello ", req.body);
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "User Doesn't Exist!" });

    if (uin !== undefined) {
      if (await User.findOne({ uin }))
        return res.status(400).json({ msg: "UIN is Already Exist, Please Enter Correct UIN!" });
    }

    if (req.body.first_name) user.first_name = req.body.first_name;
    if (req.body.middle_name) user.middle_name = req.body.middle_name;
    if (req.body.last_name) user.last_name = req.body.last_name;
    if (req.body.number) user.number = req.body.number;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.dateOfBirth) user.dateOfBirth = req.body.dateOfBirth;
    if (req.body.profile) user.profile = req.body.profile;
    if (req.body.fullAddress) {
      if (req.body.fullAddress.address) user.fullAddress.address = req.body.fullAddress.address;
      if (req.body.fullAddress.pincode) user.fullAddress.pincode = req.body.fullAddress.pincode;
    }

    // Check for student-specific fields
    if (user.role === "student" && req.body.studentProfile) {
      if (req.body.studentProfile.rollNumber) user.studentProfile.rollNumber = req.body.studentProfile.rollNumber;
      if (req.body.studentProfile.UIN) user.studentProfile.UIN = req.body.studentProfile.UIN;
      if (req.body.studentProfile.department) user.studentProfile.department = req.body.studentProfile.department;
      if (req.body.studentProfile.year) user.studentProfile.year = req.body.studentProfile.year;
      if (req.body.studentProfile.addmissionYear) user.studentProfile.addmissionYear = req.body.studentProfile.addmissionYear;

      if (req.body.studentProfile.SGPA) {
        if (req.body.studentProfile.SGPA.sem1 && req.body.studentProfile.SGPA.sem1 !== "undefined") user.studentProfile.SGPA.sem1 = req.body.studentProfile.SGPA.sem1;
        if (req.body.studentProfile.SGPA.sem2 && req.body.studentProfile.SGPA.sem2 !== "undefined") user.studentProfile.SGPA.sem2 = req.body.studentProfile.SGPA.sem2;
        if (req.body.studentProfile.SGPA.sem3 && req.body.studentProfile.SGPA.sem3 !== "undefined") user.studentProfile.SGPA.sem3 = req.body.studentProfile.SGPA.sem3;
        if (req.body.studentProfile.SGPA.sem4 && req.body.studentProfile.SGPA.sem4 !== "undefined") user.studentProfile.SGPA.sem4 = req.body.studentProfile.SGPA.sem4;
        if (req.body.studentProfile.SGPA.sem5 && req.body.studentProfile.SGPA.sem5 !== "undefined") user.studentProfile.SGPA.sem5 = req.body.studentProfile.SGPA.sem5;
        if (req.body.studentProfile.SGPA.sem6 && req.body.studentProfile.SGPA.sem6 !== "undefined") user.studentProfile.SGPA.sem6 = req.body.studentProfile.SGPA.sem6;
        if (req.body.studentProfile.SGPA.sem7 && req.body.studentProfile.SGPA.sem7 !== "undefined") user.studentProfile.SGPA.sem7 = req.body.studentProfile.SGPA.sem7;
        if (req.body.studentProfile.SGPA.sem8 && req.body.studentProfile.SGPA.sem8 !== "undefined") user.studentProfile.SGPA.sem8 = req.body.studentProfile.SGPA.sem8;
      }

      if (req.body.studentProfile.pastQualification) {
        if (req.body.studentProfile.pastQualification.ssc) {
          if (req.body.studentProfile.pastQualification.ssc.board) user.studentProfile.pastQualification.ssc.board = req.body.studentProfile.pastQualification.ssc.board;
          if (req.body.studentProfile.pastQualification.ssc.year) user.studentProfile.pastQualification.ssc.year = req.body.studentProfile.pastQualification.ssc.year;
          if (req.body.studentProfile.pastQualification.ssc.percentage) user.studentProfile.pastQualification.ssc.percentage = req.body.studentProfile.pastQualification.ssc.percentage;
        }

        if (req.body.studentProfile.pastQualification.hsc && req.body.studentProfile.pastQualification.hsc.board !== "undefined") {
          user.studentProfile.pastQualification.hsc.board = req.body.studentProfile.pastQualification.hsc.board;
          user.studentProfile.pastQualification.hsc.year = req.body.studentProfile.pastQualification.hsc.year;
          user.studentProfile.pastQualification.hsc.percentage = req.body.studentProfile.pastQualification.hsc.percentage;
        }

        if (req.body.studentProfile.pastQualification.diploma && req.body.studentProfile.pastQualification.diploma.board !== "undefined") {
          user.studentProfile.pastQualification.diploma.department = req.body.studentProfile.pastQualification.diploma.department;
          user.studentProfile.pastQualification.diploma.year = req.body.studentProfile.pastQualification.diploma.year;
          user.studentProfile.pastQualification.diploma.percentage = req.body.studentProfile.pastQualification.diploma.percentage;
        }
      }
    }

    // check if request came from user except superuser
    if (req.body.role !== 'superuser') {
      // set isProfileCompleted true
      user.isProfileCompleted = true;
    }

    // Save the updated user data
    await user.save();

    res.json({ msg: "Data Updated Successfully!" });
  } catch (error) {
    console.log("student.update.controller => CompletProfile ==> ", error)
  }
}


module.exports = UpdateProfile;