const Class = require('../models/class.model');
const Student = require('../models/student.model')
const Exam = require('../models/examinations.model')
const Schedule = require('../models/schedule.model')

module.exports = {

    getAllClasses: async (req, res) => {
        try {
            const schoolId = req.user.schoolId;
            const allClasses = await Class.find({ school: schoolId })

            res.status(200).json({ success: true, message: 'successfully in fetching Classes.', data: allClasses });

        } catch (err) {
            console.log('GetAllClassers =>', err)
            res.status(500).json({ success: false, message: 'Server Error in Getting Classes.' });
        }
    },

    createClass: async (req, res) => {
        try {

            const newClass = new Class({
                school: req.user.schoolId,
                class_text: req.body.class_text,
                class_num: req.body.class_num,


            })
            await newClass.save();
            res.status(200).json({ success: true, message: 'successfully created the Class' });

        } catch (err) {
            res.status(500).json({ success: false, message: 'Server Error in Creating class' });
            console.log(err)
        }
    },
    updateClassWithId: async (req, res) => {
        try {
            let id = req.params.id;
            await Class.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
            const classAfterUpdate = await Class.findOne({ _id: id });
            res.status(200).json({ success: true, message: "Class updated.", data: classAfterUpdate })
        } catch (err) {
            console.log('Update class Error =>', err)
            res.status(500).json({ success: false, message: 'Server Error in Updating class' });

        }
    },
    deleteClassWithId: async (req, res) => {
        try {
            let id = req.params.id;

            let schoolId = req.user.schoolId;

            const classStudentCount = (await Student.find({ student_class: id, school: schoolId })).length;
            const classExamConut = (await Exam.find({ class: id, school: schoolId })).length;
            const classScheduleCount = (await Schedule.find({ class: id, school: schoolId })).length;

            if ((classStudentCount === 0) && (classExamConut === 0) && (classScheduleCount)) {

                await Class.findOneAndDelete({ _id: id, school: schoolId })

                res.status(200).json({ success: true, message: 'Class Deleted Sucessfully.' })

            } else {
                res.status(500).json({ success: false, message: 'This class is already in use.' })
            }

        } catch (err) {
            console.log('Update class Error =>', err)
            res.status(500).json({ success: false, message: 'Server Error in Deleting class' });
        }

    }
}