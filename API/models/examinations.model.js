const mongoose = require('mongoose');

const examinationsSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.ObjectId, ref: 'School' },
    subject: { type: mongoose.Schema.ObjectId, ref: 'Subject' },
    examDate: { type: Date, required: true },
    examType: { type: String, required: true },
    class: { type: mongoose.Schema.ObjectId, ref: 'Class' },



    createdAt: { type: Date, default: new Date() }
})


module.exports = mongoose.model('Examinations', examinationsSchema)