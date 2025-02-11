//! CRUD applications - CREATE,READ, UPDATE AND DELETE
//! AUTHENTICATION - SCHOOL, STUDENT AND Teacher
require('dotenv').config()
const formidable = require('formidable');
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')

const School = require('../models/schedule.model');

module.exports = {
    registerSchool: async (req, res) => {



        try {
            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                const photo = files.image[0];
                let filePath = photo.filepath;
                let originalFileName = photo.originalFilename.replace(" ", "_");
                let newPath = path.join(__dirname, process.env.SCHOOL_IMAGE_PATH, originalFileName);

                let photoData = fs.readFileSync(filePath);
                fs.writeFileSync(newPath, photoData);

                const salt = bcrypt.genSaltSync(10)
                const hashPassword = bcrypt.hashSync(fields.password[0])
                const newSchool = new School({
                    school_name: fields.school_name[0],
                    email: fields.email[0],
                    owner_name: fields.owner_name[0],
                    password: hashPassword
                })

                const savedSchool = await newSchool.save();
                res.status(200).json({ success: true, data: savedSchool, message: 'School is registered Successfully.' })

            })
        } catch (error) {
            res.status(500).json({ success: false, message: 'School Registration Failed.' })
        }
    },
}