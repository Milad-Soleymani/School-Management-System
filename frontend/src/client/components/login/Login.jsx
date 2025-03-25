/* eslint-disable no-unused-vars */

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik'
import { Button, CardMedia, Snackbar, Typography } from '@mui/material';
import { ref } from 'yup';
import axios from 'axios';
import MessageSnackbar from '../../../basic utility component/snackbar/MessageSnackbar';
import { loginSchema } from '../../../yupSchema/loginSchema';

export default function Login() {

    const initialValues = {
        email: "",
        password: "",
    }
    const Formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {


            axios.post(`http://localhost:5000/api/school/login`, { ...values })
                .then(res => {
                    console.log(res.headers.get('Authorization'));
                    setMessage(res.data.message);
                    setMessageType('success')
                    Formik.resetForm(0);
                }).catch(e => {
                    setMessage(e.response.data.message);
                    setMessageType('error')
                    console.log(e);
                })


        },
    }
    )
    const [message, setMessage] = React.useState('');
    const [messageType, setMessageType] = React.useState('');
    const handleMessageClose = () => {
        setMessage('')
    }

    return (
        <Box component={'div'} sx={{
            background:
                "url(https://cdn.pixabay.com/photo/2017/08/12/21/42/back2school-2635456_1280.png)",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '100%',
            paddingTop: '60px',
            paddingBottom: '60px'
        }}>
            {message &&
                <MessageSnackbar message={message} type={messageType} handleClose={handleMessageClose} />
            }
            <Typography variant='h2' sx={{ textAlign: 'center', marginBottom: "50px", color: 'white' }}>Login</Typography>



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




                <TextField
                    name='email'
                    label="Email"
                    value={Formik.values.email}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                />


                {Formik.touched.email && Formik.errors.email && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.email}</p>}

                <TextField
                    name='password'
                    label="Password"
                    type='password'
                    value={Formik.values.password}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                />


                {Formik.touched.password && Formik.errors.password && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.password}</p>}

                <Button type='submit' variant='content'> Submit </Button>

            </Box>
        </Box>
    );
}