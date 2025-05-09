const mongoose = require('mongoose');

//! Class Schema | مدل کلاس درسی

const classSchema = new mongoose.Schema({
  // 🔗 Reference to the school | ارجاع به مدرسه
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },

  // 🏷️ Class label (e.g. "Grade 6 - A") | متن کلاس (مثلاً: "پایه ششم - الف")
  class_text: {
    type: String,
    required: true,
  },

  // 🔢 Class number | شماره کلاس
  class_num: {
    type: Number,
    required: true,
  },

  // 👨‍🏫 Assigned teacher | معلم مسئول کلاس
  attendee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },

  // 🕒 Record creation date | تاریخ ایجاد رکورد
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

// 📦 Export the Class model | صادر کردن مدل کلاس
module.exports = mongoose.model('Class', classSchema);
