const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: { type: String, required: true },
  companyDescription: { type: String },
  companyWebsite: { type: String },
  companyLocation: { type: String, trim: true },
  companyDifficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard'] }
});

module.exports = mongoose.model('Company', companySchema);
