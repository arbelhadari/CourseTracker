// attach .env variables to proccess.env 
require('dotenv').config()

const express = require("express");
const CoursesRouter = require('./routes/courses');
const UserRouter = require('./routes/user');
const StudentRouter = require('./routes/students');
const mongoose = require('mongoose');


// to create an express app
const app = express();


// middleware - adds body to req so we can access req.body
app.use(express.json());

// middleware - fire for every request that comes in
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


// routes
app.use('/api/courses/', CoursesRouter);
app.use('/api/students', StudentRouter);
app.use('/api/user', UserRouter);


// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB\nListening on port", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    })


