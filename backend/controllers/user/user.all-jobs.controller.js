const JobSchema = require("../../models/job.model");


const AllJobs = async (req, res) => {
  try {
    const jobs = await JobSchema.find();
    res.json({ data: jobs });
  } catch (error) {
    console.log("user.all-jobs.controller.js => ", error);
    res.status(500).json({ msg: 'Server Error' });
  }
}

const DeleteJob = async (req, res) => {
  try {
    if (req.body.jobId) {
      // console.log(req.body.jobId)
      const job = await JobSchema.findById(req.body.jobId);

      await job.deleteOne();
      res.status(200).json({ msg: 'Job deleted successfully!' });
    }
  } catch (error) {
    console.log("user.all-jobs.controller.js => ", error);
    res.status(500).json({ msg: 'Server Error' });
  }
}


const JobData = async (req, res) => {
  try {
    // pass if tpo is creating new post
    if (req.params.jobId !== 'undefined') {
      const job = await JobSchema.findById(req.params.jobId);
      res.status(200).json(job);
    }
  } catch (error) {
    // checking if userId is exist or not
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'job data not found' });
    }
    console.log("user.all-jobs.controller.js => ", error);
    res.status(500).json({ msg: 'Server Error' });
  }
}



module.exports = {
  AllJobs,
  DeleteJob,
  JobData
};