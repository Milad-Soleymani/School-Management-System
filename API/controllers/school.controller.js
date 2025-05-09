//! CRUD applications - CREATE, READ, UPDATE AND DELETE
//! AUTHENTICATION - SCHOOL, STUDENT AND TEACHER

require("dotenv").config();
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const School = require("../models/school.model");

module.exports = {
  /**
   * Register a new school
   * ثبت مدرسه جدید
   */
  registerSchool: async (req, res) => {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Form parsing failed. | پردازش فرم انجام نشد.",
          });
        }

        const existingSchool = await School.findOne({ email: fields.email?.[0] });
        if (existingSchool) {
          return res.status(409).json({
            success: false,
            message: "Email already registered. | این ایمیل قبلاً ثبت شده است.",
          });
        }

        const photo = files.image?.[0];
        if (!photo) {
          return res.status(400).json({
            success: false,
            message: "School image is required. | تصویر مدرسه الزامی است.",
          });
        }

        const originalFileName = photo.originalFilename?.replace(/\s+/g, "_");
        const filePath = photo.filepath;
        const newImagePath = path.join(__dirname, process.env.SCHOOL_IMAGE_PATH, originalFileName);

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

        const newSchool = new School({
          school_name: fields.school_name[0],
          email: fields.email[0],
          owner_name: fields.owner_name[0],
          school_image: originalFileName,
          password: hashPassword,
        });

        const savedSchool = await newSchool.save();

        return res.status(201).json({
          success: true,
          message: "School registered successfully. | مدرسه با موفقیت ثبت شد.",
          data: savedSchool,
        });
      });
    } catch (error) {
      console.error("Register School Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error during registration. | خطای سرور هنگام ثبت‌نام.",
      });
    }
  },

  /**
   * Login for a school
   * ورود مدرسه به سیستم
   */
  loginSchool: async (req, res) => {
    try {
      const school = await School.findOne({ email: req.body.email });

      if (!school) {
        return res.status(401).json({
          success: false,
          message: "Email is not registered. | ایمیل ثبت نشده است.",
        });
      }

      const isAuth = bcrypt.compareSync(req.body.password, school.password);
      if (!isAuth) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password. | رمز عبور اشتباه است.",
        });
      }

      const token = jwt.sign(
        {
          id: school._id,
          schoolId: school._id,
          owner_name: school.owner_name,
          school_name: school.school_name,
          image_url: school.school_image,
          role: "SCHOOL",
        },
        process.env.JWT_SECRET
      );

      res.header("Authorization", token);

      return res.status(200).json({
        success: true,
        message: "Login successful. | ورود موفقیت‌آمیز بود.",
        user: {
          id: school._id,
          owner_name: school.owner_name,
          school_name: school.school_name,
          image_url: school.school_image,
          role: "SCHOOL",
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
   * Get all schools (without sensitive data)
   * دریافت لیست مدارس (بدون اطلاعات حساس)
   */
  getAllSchools: async (req, res) => {
    try {
      const schools = await School.find().select([
        "-password",
        "-_id",
        "-email",
        "-owner_name",
        "-createdAt",
      ]);

      return res.status(200).json({
        success: true,
        message: "Fetched all schools. | دریافت لیست مدارس با موفقیت انجام شد.",
        schools,
      });
    } catch (error) {
      console.error("Get All Schools Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error. | خطای سرور هنگام دریافت لیست مدارس.",
      });
    }
  },

  /**
   * Get authenticated school data
   * دریافت اطلاعات مدرسه‌ای که وارد شده است
   */
  getSchoolOwnData: async (req, res) => {
    try {
      const school = await School.findOne({ _id: req.user.id }).select("-password");

      if (!school) {
        return res.status(404).json({
          success: false,
          message: "School not found. | مدرسه پیدا نشد.",
        });
      }

      return res.status(200).json({
        success: true,
        school,
      });
    } catch (error) {
      console.error("Get Own School Data Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error. | خطای سرور هنگام دریافت اطلاعات مدرسه.",
      });
    }
  },

  /**
   * Update school information and image
   * بروزرسانی اطلاعات مدرسه
   */
  updateSchool: async (req, res) => {
    try {
      const id = req.user.id;
      const form = new formidable.IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Form parsing failed. | پردازش فرم انجام نشد.",
          });
        }

        const school = await School.findOne({ _id: id });
        if (!school) {
          return res.status(404).json({
            success: false,
            message: "School not found. | مدرسه پیدا نشد.",
          });
        }

        // اگر تصویر جدید ارسال شده
        if (files.image) {
          const photo = files.image[0];
          const originalFileName = photo.originalFilename.replace(/\s+/g, "_");
          const filePath = photo.filepath;

          // حذف تصویر قبلی در صورت وجود
          const oldImagePath = path.join(__dirname, process.env.SCHOOL_IMAGE_PATH, school.school_image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }

          const newImagePath = path.join(__dirname, process.env.SCHOOL_IMAGE_PATH, originalFileName);
          const imageBuffer = fs.readFileSync(filePath);
          fs.writeFileSync(newImagePath, imageBuffer);

          school.school_image = originalFileName;
        }

        // بروزرسانی سایر فیلدها
        Object.keys(fields).forEach((field) => {
          school[field] = fields[field][0];
        });

        await school.save();

        return res.status(200).json({
          success: true,
          message: "School updated successfully. | بروزرسانی مدرسه با موفقیت انجام شد.",
          school,
        });
      });
    } catch (error) {
      console.error("Update School Error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update school. | بروزرسانی مدرسه ناموفق بود.",
      });
    }
  }
};
