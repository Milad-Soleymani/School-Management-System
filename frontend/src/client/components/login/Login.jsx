/* eslint-disable no-unused-vars */

// ✅ Import Libraries | وارد کردن کتابخانه‌ها
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ✅ Import Custom Modules | وارد کردن ماژول‌های اختصاصی
import MessageSnackbar from '../../../basic utility component/snackbar/MessageSnackbar';
import { loginSchema } from '../../../yupSchema/loginSchema';
import { AuthContext } from '../../../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login } = React.useContext(AuthContext);

    // 📦 Initial form values | مقادیر اولیه فرم
    const initialValues = {
        email: "",
        password: "",
    };

    // 🧠 Formik configuration | پیکربندی فورمیک
    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            axios.post(`http://localhost:5000/api/school/login`, values)
                .then(res => {
                    const token = res.headers.get('Authorization');
                    if (token) {
                        localStorage.setItem("token", token);
                    }

                    const user = res.data.user;
                    if (user) {
                        localStorage.setItem("user", JSON.stringify(user));
                        login(user);
                    }

                    setMessage(res.data.message);
                    setMessageType('success');
                    formik.resetForm();
                    navigate('/school');
                })
                .catch(e => {
                    setMessage(e.response?.data?.message || 'خطا در ورود به سیستم');
                    setMessageType('error');
                    console.error(e);
                });
        }
    });

    // 💬 Snackbar state | وضعیت پیام اطلاع‌رسانی
    const [message, setMessage] = React.useState('');
    const [messageType, setMessageType] = React.useState('');
    const handleMessageClose = () => setMessage('');

    return (
        <Box
            sx={{
                background: "url(https://cdn.pixabay.com/photo/2017/08/12/21/42/back2school-2635456_1280.png)",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                minHeight: '80vh',
                paddingTop: '60px',
                paddingBottom: '60px'
            }}
        >
            {/* 🔔 Snackbar for messages | نمایش پیام موفقیت یا خطا */}
            {message && (
                <MessageSnackbar
                    message={message}
                    type={messageType}
                    handleClose={handleMessageClose}
                />
            )}

            {/* 📋 Login Form | فرم ورود */}
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
                    borderRadius: '10px',
                    padding: '30px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <Typography variant='h4' sx={{ textAlign: 'center', marginBottom: "20px", color: 'black' }}>
                    ورود به حساب مدرسه
                </Typography>

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
                    name='password'
                    label="رمز عبور"
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <Button
                    type='submit'
                    variant='contained'
                    sx={{ bgcolor: '#106FD5', color: 'white' }}
                >
                    ورود
                </Button>
            </Box>
        </Box>
    );
}
