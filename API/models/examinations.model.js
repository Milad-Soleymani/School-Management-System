const mongoose = require('mongoose');

//! Examinations Schema | مدل امتحانات

const examinationsSchema = new mongoose.Schema({
  // 🔗 Reference to the school | ارجاع به مدرسه
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },

  // 📚 Reference to the subject | ارجاع به درس
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },

  // 📅 Date of the exam | تاریخ برگزاری امتحان
  examDate: {
    type: Date,
    required: true,
  },

  // 📝 Type of the exam (e.g. Midterm, Final) | نوع امتحان (میان‌ترم، پایان‌ترم و ...)
  examType: {
    type: String,
    required: true,
  },

  // 🏫 Reference to the class | ارجاع به کلاس
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },

  // 🕒 Record creation date | تاریخ ثبت رکورد
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

// 📦 Export the Examinations model | صادر کردن مدل امتحانات
module.exports = mongoose.model('Examinations', examinationsSchema);
