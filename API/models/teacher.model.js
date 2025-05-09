const mongoose = require('mongoose');

//! Teacher Schema | مدل معلم

const teacherSchema = new mongoose.Schema({
  // 🔗 Reference to the school | ارجاع به مدرسه
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },

  // 📧 Teacher's email | ایمیل معلم
  email: {
    type: String,
    required: true,
  },

  // 👨‍🏫 Teacher's name | نام معلم
  name: {
    type: String,
    required: true,
  },

  // 🎓 Teacher's qualification | مدرک تحصیلی معلم
  qualification: {
    type: String,
    required: true,
  },

  // 🎂 Teacher's age | سن معلم
  age: {
    type: Number,
    required: true,
  },

  // 🚻 Teacher's gender | جنسیت معلم
  gender: {
    type: String,
    required: true,
  },

  // 🖼️ Teacher's image | تصویر معلم
  teacher_image: {
    type: String,
    required: true,
  },

  // 🔒 Teacher's password | رمز عبور معلم
  password: {
    type: String,
    required: true,
  },

  // 🕒 Record creation date | تاریخ ثبت معلم
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

// 📦 Export the Teacher model | صادر کردن مدل معلم
module.exports = mongoose.model('Teacher', teacherSchema);
