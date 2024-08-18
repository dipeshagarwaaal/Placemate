const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  number: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'tpo_admin', 'management_admin'],
    required: true
  },
  profile: {
    type: String,
    default: '/profileImage/default/defaultProfileImg.jpg',
    trim: true
  },
  // Student specific fields
  studentProfile: {
    enrollmentNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    department: {
      type: String,
      trim: true
    },
    year: {
      type: Number
    },
    // more for student
  },
  // TPO Admin specific fields
  tpoProfile: {
    department: {
      type: String,
      trim: true
    },
    // more for tpo
  },
  // Management Admin specific fields
  managementProfile: {
    position: {
      type: String,
      trim: true
    },
    // more for management
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  token: {
    type: String
  }
});

module.exports = mongoose.model("Users", UserSchema);