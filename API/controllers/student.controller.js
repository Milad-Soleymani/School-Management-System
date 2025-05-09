//! CRUD applications - CREATE, READ, UPDATE AND DELETE
//! AUTHENTICATION - Student, STUDENT AND TEACHER

require("dotenv").config();
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");

module.exports = {
  /**
   * Register a new Student
   * ثبت دانش اموز جدید
   */
  registerStudent: async (req, res) => {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Form parsing failed. | پردازش فرم انجام نشد.",
          });
        }

        const existingStudent = await Student.findOne({ email: fields.email?.[0] });
        if (existingStudent) {
          return res.status(409).json({
            success: false,
            message: "Email already registered. | این ایمیل قبلاً ثبت شده است.",
          });
        }

        const photo = files.image?.[0];
        if (!photo) {
          return res.status(400).json({
            success: false,
            message: "Student image is required. | تصویر دانش اموز الزامی است.",
          });
        }

        const originalFileName = photo.originalFilename?.replace(" ", "_");
        const filePath = photo.filepath;
        const newImagePath = path.join(__dirname, process.env.STUDENT_IMAGE_PATH, originalFileName);

        try {
          const imageBuffer = fs.readFileSync(filePath);
          fs.writeFileSync(newImagePath, imageBuffer);
        } catch (imgErr) {
          return res.status(500).json({
            success: false,
            message: "Failed to save image. | ذخیره تصویر انجام نشد.",
          });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(fields.password[0], salt);

        const newStudent = new Student({

              school: req.user.schoolId,
              email: fields.email[0],
              name: fields.name[0],
              student_class: fields.student_class[0],
              age: fields.age[0],
              gender: fields.gender[0],
              guardian: fields.guardian[0],
              guardian_phone: fields.guardian_phone[0],
              student_image: fields.student_image,
              password: hashPassword,
              
          })
          
          
        

        const savedStudent = await newStudent.save();

        return res.status(201).json({
          success: true,
          message: "Student registered successfully. | دانش اموز با موفقیت ثبت شد.",
          data: savedStudent,
        });
      });
    } catch (error) {
      console.error("Register Student Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error during registration. | خطای سرور هنگام ثبت‌نام.",
      });
    }
  },

  /**
   * Login for a Student
   * ورود دانش اموز به سیستم
   */
  loginStudent: async (req, res) => {
    try {
      const student = await Student.findOne({ email: req.body.email });

      if (!Student) {
        return res.status(401).json({
          success: false,
          message: "Email is not registered. | ایمیل ثبت نشده است.",
        });
      }

      const isAuth = bcrypt.compareSync(req.body.password, Student.password);
      if (!isAuth) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password. | رمز عبور اشتباه است.",
        });
      }

      const token = jwt.sign(
        {
          id: student._id,
          schoolId: student.school,
          name: student.Student_name,
          image_url: student.student_image,
          role: "STUDENT",
        },
        process.env.JWT_SECRET
      );

      res.header("Authorization", token);

      return res.status(200).json({
        success: true,
        message: "Login successful. | ورود موفقیت‌آمیز بود.",
        user: {
          id: student._id,
          owner_name: student.owner_name,
          Student_name: student.student_name,
          image_url: student.student_image,
          role: "Student",
        },
      });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error during login. | خطای سرور هنگام ورود.",
      });
    }
  },

  /**
   * Get all Students (without sensitive data)
   * دریافت لیست دانش اموزان (بدون اطلاعات حساس)
   */
  getStudentsWithQuery: async (req, res) => {
    try {
        const filterQuery ={};
        const schoolId = req.user.schoolId;
        filterQuery['school']= schoolId;

        if(req.query.hasOwnProperty('search')){
            filterQuery['name']={$regex:req.query.search, $option:'i'}
        }

        if(req.query.hasOwnProperty('student_class')){
            filterQuery['student_class'] = req.query.student_class;
        }
      const students = await Student.find(filterQuery).select([
        "-password",
      ]);

      return res.status(200).json({
        success: true,
        message: "Fetched all Students. | دریافت لیست دانش اموزان با موفقیت انجام شد.",
        students,
      });
    } catch (error) {
      console.error("Get All Students Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error. | خطای سرور هنگام دریافت لیست دانش اموزان.",
      });
    }
  },

  /**
   * Get authenticated Student data
   * دریافت اطلاعات دانش اموز‌ای که وارد شده است
   */
  getStudentOwnData: async (req, res) => {
    try {
        const id =req.user.id;
        const school_id = req.user.schoolId
      const student = await Student.findOne({ _id: id, school: school_id }).select("-password");

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found. | دانش اموز پیدا نشد.",
        });
      }

      return res.status(200).json({
        success: true,
        Student,
      });
    } catch (error) {
      console.error("Get Own Student Data Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error. | خطای سرور هنگام دریافت اطلاعات دانش اموز.",
      });
    }
  },

  /**
   * Update Student information and image
   * بروزرسانی اطلاعات دانش اموز
   */
  updateStudent: async (req, res) => {
    try {
      const id = req.user.id;
      const schoolId = req.user.schoolId
      const form = new formidable.IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Form parsing failed. | پردازش فرم انجام نشد.",
          });
        }

        const student = await Student.findOne({ _id: id, schoolId });
        if (!student) {
          return res.status(404).json({
            success: false,
            message: "Student not found. | دانش اموز پیدا نشد.",
          });
        }

        // اگر تصویر جدید ارسال شده
        if (files.image) {
          const photo = files.image[0];
          const originalFileName = photo.originalFilename.replace(/\s+/g, "_");
          const filePath = photo.filepath;

          // حذف تصویر قبلی در صورت وجود
          const oldImagePath = path.join(__dirname, process.env.STUDENT_IMAGE_PATH, student.student_image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }

          const newImagePath = path.join(__dirname, process.env.STUDENT_IMAGE_PATH, originalFileName);
          const imageBuffer = fs.readFileSync(filePath);
          fs.writeFileSync(newImagePath, imageBuffer);

          student.student_image = originalFileName;
        }

        // بروزرسانی سایر فیلدها
        Object.keys(fields).forEach((field) => {
          student[field] = fields[field][0];
        });

        await student.save();

        return res.status(200).json({
          success: true,
          message: "Student updated successfully. | بروزرسانی دانش اموز با موفقیت انجام شد.",
          student,
        });
      });
    } catch (error) {
      console.error("Update Student Error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update Student. | بروزرسانی دانش اموز ناموفق بود.",
      });
    }
  }
};
