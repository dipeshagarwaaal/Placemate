const mongoose = require('mongoose');
const JobSchema = require('./job.model');

const UserSchema = new mongoose.Schema({
  first_name: { type: String, trim: true },
  middle_name: { type: String, trim: true },
  last_name: { type: String, trim: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  number: { type: Number, },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'tpo_admin', 'management_admin', 'superuser'], required: true },
  profile: { type: String, default: '/profileImgs/default/defaultProfileImg.jpg', },
  fullAddress: {
    address: { type: String },
    pincode: { type: Number }
  },
  dateOfBirth: { type: Date, },
  createdAt: { type: Date, default: new Date() },
  token: { type: String },
  isProfileCompleted: { type: Boolean, default: false },
  // Student specific fields
  studentProfile: {
    isApproved: { type: Boolean },
    rollNumber: { type: Number },
    resume: {
      filename: {
        type: String,
      },
      filepath: {
        type: String,
      },
      contentType: {
        type: String,
      }
    },
    UIN: {
      type: String, unique: true,
      sparse: true, trim: true
    },
    department: { type: String, enum: ['Computer', 'Civil', 'ECS', 'AIDS', 'Mechanical'] },
    year: { type: Number, enum: [1, 2, 3, 4] },
    addmissionYear: { type: Number },
    gap: { type: Boolean, default: false },
    liveKT: { type: Number, default: 0 },
    SGPA: {
      sem1: { type: Number },
      sem2: { type: Number },
      sem3: { type: Number },
      sem4: { type: Number },
      sem5: { type: Number },
      sem6: { type: Number },
      sem7: { type: Number },
      sem8: { type: Number }
    },
    pastQualification: {
      ssc: {
        board: { type: String },
        percentage: { type: Number },
        year: { type: Number }
      },
      hsc: {
        board: { type: String },
        percentage: { type: Number },
        year: { type: Number }
      },
      diploma: {
        department: { type: String },
        percentage: { type: Number },
        year: { type: Number }
      },
    },
    appliedJobs: [
      {
        // Reference to job posting
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
        // Track application status
        status: { type: String, enum: ['applied', 'interview', 'hired', 'rejected'] },
        appliedAt: { type: Date, default: Date.now }
      }
    ],
    internships: [
      {
        type: { type: String, enum: ['Full Time', "Part Time", "On-Site", "Work From Home", "Other"] },
        companyName: { type: String },
        companyAddress: { type: String },
        companyWebsite: { type: String },
        internshipDuration: { type: Number },
        startDate: { type: Date },
        endDate: { type: Date },
        monthlyStipend: { type: Number },
        description: { type: String },
      }
    ],
  },

  // TPO Admin specific fields
  tpoProfile: {
    position: { type: String, trim: true },
    // more for tpo
  },
  // Management Admin specific fields
  managementProfile: {
    position: { type: String, trim: true },
    // more for management
  }
});

// Middleware to remove the studentId from all jobs when the student is deleted
UserSchema.pre('findOneAndDelete', async function (next) {
  try {
    // Get the user being deleted
    const user = await this.model.findOne(this.getFilter()).exec();

    // Check if the user exists
    if (!user) return next(); // Proceed without error if user is not found

    // Find all jobs where the studentId is in the applicants array and remove the studentId from the array
    await JobSchema.updateMany(
      { 'applicants.studentId': user._id }, // Match jobs where this student applied
      { $pull: { applicants: { studentId: user._id } } } // Remove the studentId from applicants
    );

    next();
  } catch (error) {
    next(error);
  }
});



module.exports = mongoose.model("Users", UserSchema);