const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        enum: ['Aptitude Test', 'Technical Interview', 'HR Interview', 'Group Discussion', 'Other']
      },
      roundStatus: { type: String, enum: ['pending', 'passed', 'failed'], default: 'pending' },
      selectionDate: { type: Date },
      joiningDate: { type: Date },
      offerLetter: { type: String },
      status: { type: String, enum: ['applied', 'interview', 'hired', 'rejected'], default: 'applied' },
      appliedAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Job', jobSchema);
