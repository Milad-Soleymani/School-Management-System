import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { classSchema } from "../../../yupSchema/classSchema";
import axios from "axios";
import { baseApi } from '../../../enviorment'
import { useEffect, useState } from "react";

// ! ICONS
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageSnackbar from "../../../basic utility component/snackbar/MessageSnackbar";
import { withEmotionCache } from "@emotion/react";

export default function Class() {
    const [classes, setClasses] = useState([]);
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
        Formik.setFieldValue("class_text", "")
        Formik.setFieldValue("class_num", "")
    }
    const handleEdit = (id, class_text, class_num) => {
        console.log(id)
        setEdit(true)
        setEditId(id)
        Formik.setFieldValue("class_text", class_text)
        Formik.setFieldValue("class_num", class_num)
    }
    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`${baseApi}/class/delete/${id}`).then(res => {
            setMessage("کلاس با موفقیت ایجاد شد")
            setMessageType('success')

        }).catch(err => {
            console.log(err)
            setMessage('خطا در حذف کردن کلاس ');
            setMessageType('error')
        })
    }
    const Formik = useFormik({
        initialValues: { class_text: '', class_num: "" },
        validationSchema: classSchema,
        onSubmit: (values) => {
            console.log(values)

            if (edit) {
                axios.patch(`${baseApi}/class/update/${editId}`, { ...values }).then(res => {
                    console.log('Class add response', res)
                    setMessage('کلاس با موفقیت بروز رسانی شد');
                    setMessageType('success')
                    cancelEdit();
                }).catch(Err => {
                    console.log("Error in class ", Err)
                    setMessage('خطا در بروز رسانی کلاس');
                    setMessageType('error')
                })

            } else {
                axios.post(`${baseApi}/class/create`, { ...values }).then(res => {
                    console.log('Class add response', res)
                    setMessage('کلاس با موفقیت ساخته شد');
                    setMessageType('success')
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }).catch(Err => {
                    console.log("Error in class ", Err)
                    setMessage('خطا در ذخیره سازی کلاس');
                    setMessageType('error')
                })
                Formik.resetForm();
            }

        }

    })
    const fetchAllClasses = () => {
        axios.get(`${baseApi}/class/all`).then(res => {
            setClasses(res.data.data)
        }).catch(Err => {
            console.log("Error in fetchin all classes ", Err)

        })
    }
    useEffect(() => {
        fetchAllClasses();
    }, [message])
    return (
        <>
            {message &&
                <MessageSnackbar message={message} type={messageType} handleClose={handleMessageClose} />
            }
            <Typography variant="h1" sx={{textAlign: 'center',}}> کلاس </Typography>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 }, display: 'flex',
                    flexDirection: 'column',
                    width: '50vw',
                    minWidth: '230px',
                    margin: 'auto',
                    background: '#fff'
                }}
                noValidate
                autoComplete="off"
                onSubmit={Formik.handleSubmit}
            >


                {edit ? <Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 700 }}>ویرایش کردن کلاس</Typography> : <Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 700 }}>اضافه کردن کلاس جدید</Typography>
                }

                <TextField
                    name='class_text'
                    label="نام کلاس"
                    value={Formik.values.class_text}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                />


                {Formik.touched.class_text && Formik.errors.class_text && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.class_text}</p>}

                <TextField
                    name='class_num'
                    label="شماره کلاس"
                    value={Formik.values.class_num}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                />


                {Formik.touched.class_num && Formik.errors.class_num && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.class_num}</p>}

                <Button type='submit' variant='contained' sx={{ bgcolor: '#106FD5', color: 'white' }}>
                    ثبت
                </Button>

                {edit &&
                    <Button type='button' variant='contained' onClick={() => { cancelEdit() }} sx={{ bgcolor: 'red', color: 'white', }}> لغو </Button>
                }
            </Box>
            <Box component={'div'} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', }}>
                {classes && classes.map(x => {
                    return (
                        <>
                            <Paper key={x.ـid} sx={{ m: 2, p: 2 }}>
                                <Box component={'div'}><Typography variant="h5">کلاس : {x.class_text} [{x.class_num}]</Typography></Box>
                                <Box component={'div'}> <Button onClick={() => { handleEdit(x._id, x.class_text, x.class_num) }}><EditIcon /></Button>
                                    <Button onClick={() => { handleDelete(x._id) }}> <DeleteIcon sx={{ color: 'red' }}></DeleteIcon> </Button> </Box>
                            </Paper>
                        </>
                    )
                })}
            </Box>
        </>
    )
}