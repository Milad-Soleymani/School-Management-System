const mongoose = require('mongoose');

//! Attendance Schema | مدل حضور و غیاب

const attendanceSchema = new mongoose.Schema({
  // 🔗 Reference to the school | ارجاع به مدرسه
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },

  // 🔗 Reference to the student | ارجاع به دانش‌آموز
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },

  // 🔗 Reference to the class | ارجاع به کلاس
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },

  // 📅 Attendance date | تاریخ حضور و غیاب
  date: {
    type: Date,
    required: true,
  },

  // ✅ Attendance status: Present or Absent | وضعیت حضور: حاضر یا غایب
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    default: 'Absent',
  },

  // 🕒 Record creation time | زمان ایجاد رکورد
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

// 📦 Export the Attendance model | صادر کردن مدل Attendance
module.exports = mongoose.model('Attendance', attendanceSchema);
