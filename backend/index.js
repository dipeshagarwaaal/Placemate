const express = require('express');
const cors = require('cors');

const app = express();

// database import 
const mongodb = require('./config/MongoDB');
mongodb();

app.use(express.json());
app.use(cors());


// routes for student user
app.use('/student', require('./routes/student.route'));




app.listen(process.env.PORT, () => {
    console.log(`server is running in http://localhost:${process.env.PORT}`);
});