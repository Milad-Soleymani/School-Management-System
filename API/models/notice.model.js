const mongoose = require('mongoose');

//! Notice Schema | مدل اطلاعیه‌ها

const noticeSchema = new mongoose.Schema({
  // 🔗 Reference to the school | ارجاع به مدرسه
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },

  // 📝 Title of the notice | عنوان اطلاعیه
  title: {
    type: String,
    required: true, // ← اصلاح شده از "requird"
  },

  // 📩 Message content | محتوای پیام
  message: {
    type: String,
    required: true,
  },

  // 🎯 Audience of the notice | مخاطب اطلاعیه
  audience: {
    type: String,
    enum: ['student', 'teacher'], // فقط دانش‌آموز یا معلم
    required: true,
  },

  // 🕒 Record creation date | تاریخ ثبت اطلاعیه
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

// 📦 Export the Notice model | صادر کردن مدل اطلاعیه
module.exports = mongoose.model('Notice', noticeSchema);
