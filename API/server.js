//! Import modules
require('dotenv').config('');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

//! Create express app & use middleware
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(cookieParser())

//! MONGODB CONNECTION
mongoose.connect('mongodb://localhost:27017/schoolManagementPorkar')
    .then(db => {
        console.log('Mongodb is connected Successfully')
    }).catch(err => {
        console.log("Mongodb err",err)
    })

//! listen port
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server is running at port =>', PORT)
})