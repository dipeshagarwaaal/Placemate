const JobSchema = require("../../models/job.model");
const bcrypt = require('bcrypt');


const PostJob = async (req, res) => {
  try {
    const companyDetails = {
      companyName: req.body.companyName,
      companyWebsite: req.body.companyWebsite,
      companyLocation: req.body.companyLocation,
    };
    const jobTitle = req.body.jobTitle;
    const jobDescription = req.body.contentJobDes;
    const eligibility = req.body.contentJobEli;
    const salary = req.body.salary;
    const howToApply = req.body.contentJobHowToApply;
    const applicationDeadline = req.body.applicationDeadline;


    // console.log(newJob);

    if (!jobTitle || !jobDescription || !eligibility || !companyDetails.companyName) {
      return res.status(400).json({ msg: 'Job title, job description, eligibility and company name are required.' });
    }


    // Create a new job object
    const newJob = new JobSchema({
      jobTitle,
      jobDescription,
      eligibility,
      salary,
      howToApply,
      postedAt: new Date(),
      applicationDeadline,
      companyDetails
    });

    await newJob.save();

    res.status(201).json({ msg: 'Job posted successfully' });

  } catch (error) {
    console.log("tpo.post-job.controller.js => ", error);
    res.status(500).json({ msg: 'Server error', error: error });
  }
}

module.exports = PostJob;