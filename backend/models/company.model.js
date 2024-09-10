const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JobSchema = require('./job.model');

const companySchema = new Schema({
  companyName: { type: String, required: true },
  companyDescription: { type: String },
  companyWebsite: { type: String },
  companyLocation: { type: String, trim: true },
  companyDifficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard'] }
});

// Middleware to remove related jobs when a company is deleted
companySchema.pre('findOneAndDelete', async function (next) {
  try {
    // Get the company being deleted
    const company = await this.model.findOne(this.getFilter()).exec();

    // Check if the company exists
    if (!company) return next(); // Proceed without error if company is not found

    // Delete all jobs where the company matches the company being deleted
    await JobSchema.deleteMany({ company: company._id });
    next();
  } catch (error) {
    next(error);
  }
});



module.exports = mongoose.model('Company', companySchema);
