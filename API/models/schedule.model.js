const mongoose = require('mongoose');

//! Schedule Schema | مدل برنامه‌زمان‌بندی

const scheduleSchema = new mongoose.Schema({
  // 🔗 Reference to the school | ارجاع به مدرسه
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },

  // 👨‍🏫 Reference to the teacher | ارجاع به معلم
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },

  // 📚 Reference to the subject | ارجاع به درس
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },

  // 🏫 Reference to the class | ارجاع به کلاس
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },

  // 🕒 Start time of the class | زمان شروع کلاس
  startTime: {
    type: Date,
    required: true,
  },

  // 🕓 End time of the class | زمان پایان کلاس
  endTime: {
    type: Date,
    required: true,
  },

  // 🕒 Record creation date | تاریخ ایجاد رکورد
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

// 📦 Export the Schedule model | صادر کردن مدل برنامه‌زمان‌بندی
module.exports = mongoose.model('Schedule', scheduleSchema);
