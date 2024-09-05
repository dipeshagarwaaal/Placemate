const mongoose = require('mongoose');

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
    UIN: {
      type: String, unique: true,
      sparse: true, trim: true
    },
    department: { type: String, enum: ['Computer', 'Civil', 'ECS', 'AIDS', 'Mechanical'] },
    year: { type: Number, enum: [1, 2, 3, 4] },
    addmissionYear: { type: Number },
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
    ]

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

module.exports = mongoose.model("Users", UserSchema);