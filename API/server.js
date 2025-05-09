//! Import required modules | وارد کردن ماژول‌های مورد نیاز
require('dotenv').config(''); // 📦 Load environment variables | بارگذاری متغیرهای محیطی
const express = require('express'); // 🚀 Express.js framework | فریمورک اکسپرس
const cors = require('cors'); // 🔐 CORS middleware | میانه‌افزار CORS
const mongoose = require('mongoose'); // 💾 Mongoose for MongoDB | موگوس برای اتصال به MongoDB
const cookieParser = require('cookie-parser'); // 🍪 Middleware to parse cookies | میانه‌افزار برای تجزیه کوکی‌ها

//! Import Routers | وارد کردن روت‌ها
const schoolRouter = require("./routers/school.router"); // 🏫 School routes | روت‌های مدرسه
const classRouter = require("./routers/class.router"); // 🏫 Class routes | روت‌های کلاس
const subjectRouter = require("./routers/subject.router"); // 🏫 Class routes | روت‌های کلاس
//! Create express app & apply middleware | ایجاد اپلیکیشن اکسپرس و اعمال میانه‌افزارها
const app = express(); 
app.use(express.json()); // 📄 Parse JSON request bodies | تجزیه بدنه درخواست‌های JSON
app.use(express.urlencoded({ extended: true })); // 📦 Parse URL-encoded data | تجزیه داده‌های URL-encoded
const corsOption = { exposedHeaders: "Authorization" }; // ⚙️ CORS settings | تنظیمات CORS
app.use(cors(corsOption)); 
app.use(cookieParser()); // 🍪 Parse cookies | تجزیه کوکی‌ها

//! MONGODB CONNECTION | اتصال به MongoDB
mongoose.connect(process.env.MONGODB_URI) // 🔗 Connect to MongoDB | اتصال به MongoDB
    .then(db => {
        console.log('Mongodb is connected successfully'); // ✅ Connection success | موفقیت در اتصال
    }).catch(err => {
        console.log("Mongodb error", err); // ❌ Error handling | مدیریت خطا
    });

//! Routers | روت‌ها
app.use('/api/school', schoolRouter); // 🏫 School routes | روت‌های مدرسه
app.use('/api/class', classRouter); // 🏫 Class routes | روت‌های کلاس
app.use('/api/subject', subjectRouter); // 🏫 Class routes | روت‌های کلاس
//! Start the server | راه‌اندازی سرور
const PORT = process.env.PORT; // 📍 Server port | پورت سرور
app.listen(PORT, () => {
    console.log('Server is running at port =>', PORT); // 🔊 Server running message | پیغام راه‌اندازی سرور
});
