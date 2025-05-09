const express = require('express');
const authMiddleware = require("../auth/auth.js");
const {
    createSubject,
    getAllSubjects,
    updateSubjectWithId,
    deleteSubjectWithId
} = require('../controllers/subject.controller.js');


const router = express.Router();

//! Routers | روت‌ها

// 📜 Create a new Subject | ایجاد یک کلاس جدید
router.post('/create', authMiddleware(['SCHOOL']),createSubject);

// 📜 Get all registered Subjectes | دریافت لیست تمامی کلاس های ثبت‌شده
router.get('/all', authMiddleware(['SCHOOL']), getAllSubjects);

// 📜 Update Subject data | به‌روزرسانی اطلاعات کلاس
router.patch('/update/:id', authMiddleware(['SCHOOL']), updateSubjectWithId);

// 📜 Delete Subject | حذف کلاس 
router.delete('/delete/:id', authMiddleware(['SCHOOL']), deleteSubjectWithId);

// 📦 Export router | صادر کردن روت‌ها
module.exports = router;
