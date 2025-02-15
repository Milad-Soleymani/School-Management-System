const express = require('express');
const authMiddleware = require("../auth/auth.js")
const { registerSchool, getAllSchools, loginSchool, updateSchool, getSchoolOwnData } = require('../controllers/school.controller.js');

const router = express.Router();

// ! Routers


router.post('/register', registerSchool);   // * School register  router
router.get('/all', getAllSchools);  // * Get all schools router
router.get('/login', loginSchool);  // *  School login router
router.patch('update', authMiddleware(['SCHOOL']), updateSchool);   // * School update router 
router.get('/fetch-single', authMiddleware(['SCHOOL']), getSchoolOwnData);  // * School fetch single data router


module.exports = router;