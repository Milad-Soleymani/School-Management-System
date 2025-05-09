const mongoose = require('mongoose');

//! School Schema | مدل مدرسه

const schoolSchema = new mongoose.Schema({
  // 🏫 School name | نام مدرسه
  school_name: {
    type: String,
    required: true, // اصلاح شده از "require" به "required"
  },

  // 📧 School email | ایمیل مدرسه
  email: {
    type: String,
    required: true,
  },

  // 👨‍🏫 Owner's name | نام صاحب مدرسه
  owner_name: {
    type: String,
    required: true,
  },

  // 🖼️ Image of the school | تصویر مدرسه
  school_image: {
    type: String,
    required: true,
  },

  // 🔒 Password | رمز عبور
  password: {
    type: String,
    required: true,
  },

  // 🕒 Record creation date | تاریخ ثبت مدرسه
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

// 📦 Export the School model | صادر کردن مدل مدرسه
module.exports = mongoose.model('School', schoolSchema);
