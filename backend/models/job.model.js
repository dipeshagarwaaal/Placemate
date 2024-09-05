const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  eligibility: { type: String },
  salary: { type: Number },
  howToApply: { type: String },
  postedAt: { type: Date, default: Date.now },
  applicationDeadline: { type: Date },
  companyDetails: {
    companyName: { type: String, required: true },
    companyWebsite: { type: String },
    companyLocation: { type: String, trim: true },
    companyDifficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard'] }
  }
});

module.exports = mongoose.model('Job', jobSchema);
