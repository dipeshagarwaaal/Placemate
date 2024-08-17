const express = require('express');
const cors = require('cors');
const path = require("path");

const app = express();

// database import 
const mongodb = require('./config/MongoDB');
mongodb();

app.use(express.json());
app.use(cors());

app.use('/profileImage', express.static(path.join(__dirname, 'public/profileImgs')));

// routes for student user
app.use('/student', require('./routes/student.route'));




app.listen(process.env.PORT, () => {
    console.log(`server is running in http://localhost:${process.env.PORT}`);
});