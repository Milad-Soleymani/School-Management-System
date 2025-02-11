//! CRUD applications - CREATE,READ, UPDATE AND DELETE
//! AUTHENTICATION - SCHOOL, STUDENT AND Teacher

const formidable = require('formidable');
const path = require('path')

const School = require('../models/schedule.model');

module.exports = {
    registerSchool: async (req, res) => {

        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            const photo = files.image[0];
            let filepath = photo.filepath;
            let originalFileName = photo.originalFilename.replace(" ", "_");
            let newPath = path.join(__dirname, SCHOOL_IMAGE_PATH);
            console.log(err)
        })
    }
}