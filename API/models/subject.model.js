const mongoose = require('mongoose');

//! Subject Schema | مدل درس

const subjectSchema = new mongoose.Schema({
  // 🔗 Reference to the school | ارجاع به مدرسه
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },

  // 📚 Subject name | نام درس
  subject_name: {
    type: String,
    required: true,
  },

  // 🔑 Subject codename (unique identifier) | کدنام درس (شناسه منحصر به فرد)
  subject_codename: {
    type: String,
    required: true,
  },

  // 🕒 Record creation date | تاریخ ثبت درس
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

// 📦 Export the Subject model | صادر کردن مدل درس
module.exports = mongoose.model('Subject', subjectSchema);
