//! Import modules
require('dotenv').config('');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

//! Create express app & use middleware
const app = express();
app.use(cors());
app.use(cookieParser())

//! listen port
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server is running at port =>', PORT)
})