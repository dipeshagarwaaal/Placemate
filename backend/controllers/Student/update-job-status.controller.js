const User = require("../../models/user.model");
const JobSchema = require("../../models/job.model");


const UpdateJobStatus = async (req, res) => {
  try {
    // console.log(req.params.studentId);
    // console.log(req.body.applicant);
    const job = await JobSchema.findById(req.params.jobId);

    job.applicants.some(app => {
      if (app.studentId == req.params.studentId) {
        if (req.body.applicant.currentRound) app.currentRound = req.body.applicant.currentRound;
        if (req.body.applicant.roundStatus) app.roundStatus = req.body.applicant.roundStatus;
        if (req.body.applicant.selectionDate) app.selectionDate = req.body.applicant.selectionDate;
        if (req.body.applicant.joiningDate) app.joiningDate = req.body.applicant.joiningDate;
        if (req.body.applicant.offerLetter) app.offerLetter = req.body.applicant.offerLetter;
        if (req.body.applicant.status) app.status = req.body.applicant.status;
      }
    });

    await job.save();
    res.json({ msg: "Job Status Updated Successfully!" });
  } catch (error) {
    console.log("update-job-status.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}


module.exports = {
  UpdateJobStatus
};