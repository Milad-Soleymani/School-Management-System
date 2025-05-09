/* eslint-disable no-unused-vars */

// 📦 وارد کردن کتابخانه‌ها | Importing libraries
import * as React from 'react';
import {
    Box,
    TextField,
    Button,
    CardMedia,
    Typography
} from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';

// 📦 وارد کردن فایل‌های سفارشی | Importing custom modules
import { registerSchema } from '../../../yupSchema/registerSchema';
import MessageSnackbar from '../../../basic utility component/snackbar/MessageSnackbar';

export default function Register() {

    // 🖼️ وضعیت تصویر مدرسه | School image state
    const [file, setFile] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const fileInputRef = React.useRef(null);

    const addImage = (event) => {
        const selectedFile = event.target.files[0];
        setImageUrl(URL.createObjectURL(selectedFile));
        setFile(selectedFile);
    };

    const handleClearFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setFile(null);
        setImageUrl(null);
    };

    // 🧾 مقادیر اولیه فرم | Initial form values
    const initialValues = {
        school_name: "",
        email: "",
        owner_name: "",
        password: "",
        confirm_password: "",
    };

    // 🧠 پیکربندی فرمیک | Formik config
    const formik = useFormik({
        initialValues,
        validationSchema: registerSchema,
        onSubmit: (values) => {
            if (!file) {
                setMessage("لطفاً تصویر مدرسه را انتخاب کنید!");
                setMessageType("error");
                return;
            }

            const formData = new FormData();
            formData.append("image", file, file.name);
            formData.append("school_name", values.school_name);
            formData.append("email", values.email);
            formData.append("owner_name", values.owner_name);
            formData.append("password", values.password);

            axios.post(`http://localhost:5000/api/school/register`, formData)
                .then(res => {
                    setMessage(res.data.message);
                    setMessageType('success');
                    formik.resetForm();
                    handleClearFile();
                })
                .catch(e => {
                    setMessage(e.response?.data?.message || 'ثبت‌نام با خطا مواجه شد');
                    setMessageType('error');
                    console.error(e);
                });
        },
    });

    // 📢 وضعیت پیام | Message state
    const [message, setMessage] = React.useState('');
    const [messageType, setMessageType] = React.useState('');
    const handleMessageClose = () => setMessage('');

    return (
        <Box
            sx={{
                background: "url(https://cdn.pixabay.com/photo/2017/08/12/21/42/back2school-2635456_1280.png)",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                paddingY: '60px'
            }}
        >
            {/* ✅ پیام موفقیت یا خطا | Success or error message */}
            {message && (
                <MessageSnackbar
                    message={message}
                    type={messageType}
                    handleClose={handleMessageClose}
                />
            )}

            <Typography variant='h4' sx={{ textAlign: 'center', marginBottom: "30px", color: 'white' }}>
                ثبت‌نام مدرسه
            </Typography>

            {/* 📝 فرم ثبت‌نام | Registration form */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50vw',
                    minWidth: '230px',
                    margin: 'auto',
                    background: '#fff',
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <Typography> افزودن تصویر مدرسه </Typography>
                <TextField
                    type='file'
                    inputRef={fileInputRef}
                    onChange={addImage}
                />
                {imageUrl && (
                    <CardMedia component="img" height="200" image={imageUrl} />
                )}

                <TextField
                    name='school_name'
                    label="نام مدرسه"
                    value={formik.values.school_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.school_name && Boolean(formik.errors.school_name)}
                    helperText={formik.touched.school_name && formik.errors.school_name}
                />

                <TextField
                    name='email'
                    label="ایمیل"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                    name='owner_name'
                    label="نام مدیر مدرسه"
                    value={formik.values.owner_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.owner_name && Boolean(formik.errors.owner_name)}
                    helperText={formik.touched.owner_name && formik.errors.owner_name}
                />

                <TextField
                    name='password'
                    label="رمز عبور"
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <TextField
                    name='confirm_password'
                    label="تکرار رمز عبور"
                    type='password'
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                    helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                />

                <Button type='submit' variant='contained' sx={{ bgcolor: '#106FD5', color: 'white' }}>
                    ثبت‌نام
                </Button>
            </Box>
        </Box>
    );
}
