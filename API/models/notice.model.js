const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.ObjectId, ref: 'School' },
    title:{type: String, requird: true},
    message: {type:String, required: true},
    audience:{type:String, enum:['student', 'teacher'], required: true},    




    createdAt: { type: Date, default: new Date() }
})


module.exports = mongoose.model('Notice', noticeSchema)