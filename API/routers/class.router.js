const express = require('express');
const authMiddleware = require("../auth/auth.js");
const {
    createClass,
    getAllClasses,
    updateClassWithId,
    deleteClassWithId
} = require('../controllers/class.controller.js');


const router = express.Router();

//! Routers | روت‌ها

// 📜 Create a new class | ایجاد یک کلاس جدید
router.post('/create', authMiddleware(['SCHOOL']),createClass);

// 📜 Get all registered classes | دریافت لیست تمامی کلاس های ثبت‌شده
router.get('/all', authMiddleware(['SCHOOL']), getAllClasses);

// 📜 Update class data | به‌روزرسانی اطلاعات کلاس
router.patch('/update/:id', authMiddleware(['SCHOOL']), updateClassWithId);

// 📜 Delete class | حذف کلاس 
router.delete('/delete/:id', authMiddleware(['SCHOOL']), deleteClassWithId);

// 📦 Export router | صادر کردن روت‌ها
module.exports = router;
