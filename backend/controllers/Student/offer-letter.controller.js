const User = require('../../models/user.model');
const JobSchema = require('../../models/job.model');

const UploadOfferLetter = async (req, res) => {
  try {
    // if file is sended from frontend
    if (!req.file) return res.status(400).send('No resume uploaded');

    const job = await JobSchema.findById(req.body.jobId);

    const offerLetterPath = "/" + req.file.fieldname + "/" + req.file.filename;

    // finding respected applicants to upload offer letter
    job?.applicants?.some(app => {
      if (app.studentId == req.body.studentId) app.offerLetter = offerLetterPath
      else return res.json({ msg: "Error in uploading due student not applied to this job!" });
    })

    await job.save();

    res.status(200).json({ msg: 'Offer Letter Uploaded Successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error', error: error });
  }
}

module.exports = UploadOfferLetter;