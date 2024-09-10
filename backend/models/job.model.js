const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model')

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  eligibility: { type: String },
  salary: { type: Number },
  howToApply: { type: String },
  postedAt: { type: Date, default: Date.now },
  applicationDeadline: { type: Date },
  // company details
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  // applicants details
  applicants: [
    {
      studentId: { type: Schema.Types.ObjectId, ref: 'Student User' },
      currentRound: {
        type: String,
        enum: ['Aptitude Test', 'Technical Interview', 'HR Interview', 'Group Discussion']
      },
      roundStatus: { type: String, enum: ['pending', 'passed', 'failed'] },
      selectionDate: { type: Date },
      joiningDate: { type: Date },
      offerLetter: { type: String },
      status: { type: String, enum: ['applied', 'interview', 'hired', 'rejected'], default: 'applied' },
      appliedAt: { type: Date, default: Date.now }
    }
  ]
});

// Middleware to remove the jobId from students' appliedJobs when a job is deleted
jobSchema.pre('findOneAndDelete', async function (next) {
  try {
    // Get the job being deleted
    const job = await this.model.findOne(this.getFilter()).exec();

    // Check if the job exists
    if (!job) return next(); // Proceed without error if job is not found

    // Find all users who applied to this job and remove the jobId from their appliedJobs array
    await User.updateMany(
      { 'studentProfile.appliedJobs.jobId': job._id }, // Match users with this jobId in appliedJobs
      { $pull: { 'studentProfile.appliedJobs': { jobId: job._id } } } // Remove the jobId from appliedJobs
    );
    next();
  } catch (error) {
    next(error);
  }
});




module.exports = mongoose.model('Job', jobSchema);
