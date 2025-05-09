const mongoose = require('mongoose');

//! Student Schema | مدل دانش‌آموز

const studentSchema = new mongoose.Schema({
  // 🔗 Reference to the school | ارجاع به مدرسه
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },

  // 📧 Student's email | ایمیل دانش‌آموز
  email: {
    type: String,
    required: true,
  },

  // 🧑‍🎓 Student's name | نام دانش‌آموز
  name: {
    type: String,
    required: true,
  },

  // 🏫 Class the student belongs to | کلاسی که دانش‌آموز به آن تعلق دارد
  student_class: {
    type: String,
    required: true,
  },

  // 🎂 Student's age | سن دانش‌آموز
  age: {
    type: Number,
    required: true,
  },

  // 🚻 Student's gender | جنسیت دانش‌آموز
  gender: {
    type: String,
    required: true,
  },

  // 👨‍👩‍👧‍👦 Guardian's name | نام ولی دانش‌آموز
  guardian: {
    type: String,
    required: true,
  },

  // 📱 Guardian's phone number | شماره تلفن ولی دانش‌آموز
  guardian_phone: {
    type: String,
    required: true,
  },

  // 🖼️ Student's image | تصویر دانش‌آموز
  student_image: {
    type: String,
    required: true,
  },

  // 🔒 Password | رمز عبور
  password: {
    type: String,
    required: true,
  },

  // 🕒 Record creation date | تاریخ ثبت دانش‌آموز
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

// 📦 Export the Student model | صادر کردن مدل دانش‌آموز
module.exports = mongoose.model('Student', studentSchema);
