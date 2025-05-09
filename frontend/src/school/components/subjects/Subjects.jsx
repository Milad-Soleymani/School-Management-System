import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { subjectSchema } from "../../../yupSchema/subjectSchema";
import axios from "axios";
import { baseApi } from '../../../enviorment'
import { useEffect, useState } from "react";

// ! ICONS
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageSnackbar from "../../../basic utility component/snackbar/MessageSnackbar";

export default function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [edit, setEdit] = useState(false)
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [editId, setEditId] = useState(null)
    const handleMessageClose = () => {
        setMessage('')
    }
    const cancelEdit = () => {
        setEdit(false);
        setEditId(null)
        Formik.setFieldValue("subject_name", "")
        Formik.setFieldValue("subject_codename", "")
    }
    const handleEdit = (id, subject_name, subject_codename) => {
        console.log(id)
        setEdit(true)
        setEditId(id)
        Formik.setFieldValue("subject_name", subject_name)
        Formik.setFieldValue("subject_codename", subject_codename)
    }
    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`${baseApi}/subject/delete/${id}`).then( () => {
            setMessage("درس با موفقیت ایجاد شد")
            setMessageType('success')

        }).catch(err => {
            console.log(err)
            setMessage('خطا در حذف کردن درس ');
            setMessageType('error')
        })
    }
    const Formik = useFormik({
        initialValues: { subject_name: '', subject_codename: "" },
        validationSchema: subjectSchema,
        onSubmit: (values) => {
            console.log(values)

            if (edit) {
                axios.patch(`${baseApi}/subject/update/${editId}`, { ...values }).then(res => {
                    console.log('subject add response', res)
                    setMessage('درس با موفقیت بروز رسانی شد');
                    setMessageType('success')
                    cancelEdit();
                }).catch(Err => {
                    console.log("Error in subject ", Err)
                    setMessage('خطا در بروز رسانی درس');
                    setMessageType('error')
                })

            } else {
                axios.post(`${baseApi}/subject/create`, { ...values }).then(res => {
                    console.log('subject add response', res)
                    setMessage('درس با موفقیت ساخته شد');
                    setMessageType('success')
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }).catch(Err => {
                    console.log("Error in subject ", Err)
                    setMessage('خطا در ذخیره سازی درس');
                    setMessageType('error')
                })
                Formik.resetForm();
            }

        }

    })
    const fetchAllsubjects = () => {
        axios.get(`${baseApi}/subject/all`).then(res => {
            setSubjects(res.data.data)
        }).catch(Err => {
            console.log("Error in fetchin all subjects ", Err)

        })
    }
    useEffect(() => {
        fetchAllsubjects();
    }, [message])
    return (
        <>
            {message &&
                <MessageSnackbar message={message} type={messageType} handleClose={handleMessageClose} />
            }
            <Typography variant="h1" sx={{textAlign: 'center'}}> درس </Typography>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 }, display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    minWidth: '230px',
                    margin: 'auto',
                    background: '#fff'
                }}
                noValidate
                autoComplete="off"
                onSubmit={Formik.handleSubmit}
            >


                {edit ? <Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 700 }}>ویرایش کردن درس</Typography> : <Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 700 }}>اضافه کردن درس جدید</Typography>
                }

                <TextField
                    name='subject_name'
                    label="نام درس"
                    value={Formik.values.subject_name}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                />


                {Formik.touched.subject_name && Formik.errors.subject_name && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.subject_name}</p>}

                <TextField
                    name='subject_codename'
                    label="نام اختصاری درس"
                    value={Formik.values.subject_codename}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                />


                {Formik.touched.subject_codename && Formik.errors.subject_codename && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.subject_codename}</p>}

                <Button  type='submit' variant='contained' sx={{ bgcolor: '#106FD5', color: 'white',width: '120px' }}>
                    ثبت
                </Button>

                {edit &&
                    <Button  type='button' variant='contained' onClick={() => { cancelEdit() }} sx={{ bgcolor: 'red', color: 'white',width: '120px' }}> لغو </Button>
                }
            </Box>
            <Box component={'div'} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', }}>
                {subjects && subjects.map(x => {
                    return (
                        <>
                            <Paper key={x.ـid} sx={{ m: 2, p: 2 }}>
                                <Box component={'div'}><Typography variant="h5">درس : {x.subject_name} [{x.subject_codename}]</Typography></Box>
                                <Box component={'div'}> <Button onClick={() => { handleEdit(x._id, x.subject_name, x.subject_codename) }}><EditIcon /></Button>
                                    <Button onClick={() => { handleDelete(x._id) }}> <DeleteIcon sx={{ color: 'red' }}></DeleteIcon> </Button> </Box>
                            </Paper>
                        </>
                    )
                })}
            </Box>
        </>
    )
}