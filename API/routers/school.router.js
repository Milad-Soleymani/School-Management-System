const express = require('express');
const { registerSchool, getAllSchools, loginSchool, updateSchool, getSchoolOwnData } = require('../controllers/school.contoller');

const router = express.Router();

// ! Routers


router.post('/register', registerSchool);   // * School register  router
router.get('/all', getAllSchools);  // * Get all schools router
router.get('/login', loginSchool);  // *  School login router
router.patch('update', updateSchool);   // * School update router 
router.get('/fetch-single', getSchoolOwnData);  // * School fetch single data router


module.exports = router;