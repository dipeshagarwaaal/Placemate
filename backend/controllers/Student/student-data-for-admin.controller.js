const User = require("../../models/user.model");
const JobSchema = require("../../models/job.model");


const StudentDataYearBranchWise = async (req, res) => {
  try {
    // first year 
    const firstYearComputer = await User.find({ role: "student", "studentProfile.department": "Computer", "studentProfile.year": 1 });
    const firstYearCivil = await User.find({ role: "student", "studentProfile.department": "Civil", "studentProfile.year": 1 });
    const firstYearECS = await User.find({ role: "student", "studentProfile.department": "ECS", "studentProfile.year": 1 });
    const firstYearAIDS = await User.find({ role: "student", "studentProfile.department": "AIDS", "studentProfile.year": 1 });
    const firstYearMechanical = await User.find({ role: "student", "studentProfile.department": "Mechanical", "studentProfile.year": 1 });

    // second year 
    const secondYearComputer = await User.find({ role: "student", "studentProfile.department": "Computer", "studentProfile.year": 2 });
    const secondYearCivil = await User.find({ role: "student", "studentProfile.department": "Civil", "studentProfile.year": 2 });
    const secondYearECS = await User.find({ role: "student", "studentProfile.department": "ECS", "studentProfile.year": 2 });
    const secondYearAIDS = await User.find({ role: "student", "studentProfile.department": "AIDS", "studentProfile.year": 2 });
    const secondYearMechanical = await User.find({ role: "student", "studentProfile.department": "Mechanical", "studentProfile.year": 2 });

    // third year 
    const thirdYearComputer = await User.find({ role: "student", "studentProfile.department": "Computer", "studentProfile.year": 3 });
    const thirdYearCivil = await User.find({ role: "student", "studentProfile.department": "Civil", "studentProfile.year": 3 });
    const thirdYearECS = await User.find({ role: "student", "studentProfile.department": "ECS", "studentProfile.year": 3 });
    const thirdYearAIDS = await User.find({ role: "student", "studentProfile.department": "AIDS", "studentProfile.year": 3 });
    const thirdYearMechanical = await User.find({ role: "student", "studentProfile.department": "Mechanical", "studentProfile.year": 3 });

    // fourth year 
    const fourthYearComputer = await User.find({ role: "student", "studentProfile.department": "Computer", "studentProfile.year": 4 });
    const fourthYearCivil = await User.find({ role: "student", "studentProfile.department": "Civil", "studentProfile.year": 4 });
    const fourthYearECS = await User.find({ role: "student", "studentProfile.department": "ECS", "studentProfile.year": 4 });
    const fourthYearAIDS = await User.find({ role: "student", "studentProfile.department": "AIDS", "studentProfile.year": 4 });
    const fourthYearMechanical = await User.find({ role: "student", "studentProfile.department": "Mechanical", "studentProfile.year": 4 });

    res.json({ firstYearComputer, firstYearCivil, firstYearECS, firstYearAIDS, firstYearMechanical, secondYearComputer, secondYearCivil, secondYearECS, secondYearAIDS, secondYearMechanical, thirdYearComputer, thirdYearCivil, thirdYearECS, thirdYearAIDS, thirdYearMechanical, fourthYearComputer, fourthYearCivil, fourthYearECS, fourthYearAIDS, fourthYearMechanical });
  } catch (error) {
    console.log("student-data-for-admin.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}


module.exports = {
  StudentDataYearBranchWise,
};