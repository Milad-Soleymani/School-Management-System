const Subject = require('../models/Subject.model');
const Student = require('../models/student.model')
const Exam = require('../models/examinations.model')
const Schedule = require('../models/schedule.model')

module.exports = {

    getAllSubjects: async (req, res) => {
        try {
            const schoolId = req.user.schoolId;
            const allSubjects = await Subject.find({ school: schoolId })

            res.status(200).json({ success: true, message: 'successfully in fetching Subjects.', data: allSubjects });

        } catch (err) {
            console.log('GetAllSubjecters =>', err)
            res.status(500).json({ success: false, message: 'Server Error in Getting Subjects.' });
        }
    },

    createSubject: async (req, res) => {
        try {

            const newSubject = new Subject({
                school: req.user.schoolId,
                subject_name: req.body.subject_name,
                subject_codename: req.body.subject_codename,


            })
            await newSubject.save();
            res.status(200).json({ success: true, message: 'successfully created the Subject' });

        } catch (err) {
            res.status(500).json({ success: false, message: 'Server Error in Creating Subject' });
            console.log(err)
        }
    },
    updateSubjectWithId: async (req, res) => {
        try {
            let id = req.params.id;
            await Subject.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
            const SubjectAfterUpdate = await Subject.findOne({ _id: id });
            res.status(200).json({ success: true, message: "Subject updated.", data: SubjectAfterUpdate })
        } catch (err) {
            console.log('Update Subject Error =>', err)
            res.status(500).json({ success: false, message: 'Server Error in Updating Subject' });

        }
    },
    deleteSubjectWithId: async (req, res) => {
        try {
            let id = req.params.id;

            let schoolId = req.user.schoolId;

            const SubjectExamConut = (await Exam.find({ subject: id, school: schoolId })).length;
            const SubjectScheduleCount = (await Schedule.find({ subject: id, school: schoolId })).length;

            if ((SubjectExamConut === 0) && (SubjectScheduleCount === 0 )) {

                await Subject.findOneAndDelete({ _id: id, school: schoolId })

                res.status(200).json({ success: true, message: 'Subject Deleted Sucessfully.' })

            } else {
                res.status(500).json({ success: false, message: 'This Subject is already in use.' })
            }

        } catch (err) {
            console.log('Update Subject Error =>', err)
            res.status(500).json({ success: false, message: 'Server Error in Deleting Subject' });
        }

    }
}