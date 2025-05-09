const express = require('express');
const authMiddleware = require("../auth/auth.js");
const { 
  registerSchool, 
  getAllSchools, 
  loginSchool, 
  updateSchool, 
  getSchoolOwnData 
} = require('../controllers/school.controller.js');

const router = express.Router();

//! Routers | روت‌ها

// 📜 Register a new school | ثبت یک مدرسه جدید
router.post('/register', registerSchool); 

// 📜 Get all registered schools | دریافت لیست تمامی مدارس ثبت‌شده
router.get('/all', getAllSchools);  

// 📜 Login school | ورود به سیستم مدرسه
router.post('/login', loginSchool);  

// 📜 Update school data | به‌روزرسانی اطلاعات مدرسه
router.patch('/update', authMiddleware(['SCHOOL']), updateSchool); 

// 📜 Fetch own school's data | دریافت اطلاعات مدرسه خود (با احراز هویت)
router.get('/fetch-single', authMiddleware(['SCHOOL']), getSchoolOwnData);  

// 📦 Export router | صادر کردن روت‌ها
module.exports = router;
