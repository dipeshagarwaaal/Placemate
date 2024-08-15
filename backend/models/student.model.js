const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const StudentUserSchema = new mongoose.Schema({
    first_name: { type: String, },
    last_name: { type: String, },
    email: { type: String, unique: true },
    password: { type: String },
});

module.exports = mongoose.model("student users", StudentUserSchema);