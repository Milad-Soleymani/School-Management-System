/* eslint-disable no-unused-vars */

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { registerSchema } from '../../../yupSchema/registerSchema';
import { useFormik } from 'formik'
import { Button, CardMedia, Typography } from '@mui/material';
import { ref } from 'yup';
export default function Register() {

    const [file, setFile] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null)
    const addImage = (event) => {
        const file = event.target.files[0];
        setImageUrl(URL.createObjectURL(file));
        setFile(file);
    }
 // ! RESETING IMAGE 
 
 const fileInputRefrence = React.useRef(null);
const handleClearFile = () => {
    if(fileInputRefrence.current){
        fileInputRefrence.current.value = ''
    }
    setFile(null);
    setImageUrl(null);
}


    const initialValues = {
        school_name: "",
        email: "",
        owner_name: "",
        password: "",
        confirm_password: "",
    }
    const Formik = useFormik({
        initialValues,
        validationSchema: registerSchema,
        onSubmit: (values) => {
            console.log("Register submit values", values);
            Formik.resetForm(0);
            handleClearFile();
        }
    })

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 }, display: 'flex',
                flexDirection: 'column',
                width: '60vw',
                minWidth: '230px',
                margin: 'auto'
            }}
            noValidate
            autoComplete="off"
            onSubmit={Formik.handleSubmit}
        >


            <Typography> Add School Picture </Typography>
            <TextField
                type='file'
                inputRef={fileInputRefrence}
                onChange={(event) => { addImage(event) }}
            />
            {imageUrl && <Box>
                <CardMedia component={"img"} height='240px' image={imageUrl} />
            </Box>
            }



            <TextField
                name='school_name'
                label="School Name"
                value={Formik.values.school_name}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
            />


            {Formik.touched.school_name && Formik.errors.school_name && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.school_name}</p>}

            <TextField
                name='email'
                label="Email"
                value={Formik.values.email}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
            />


            {Formik.touched.email && Formik.errors.email && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.email}</p>}

            <TextField
                name='owner_name'
                label="School owner"
                value={Formik.values.owner_name}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
            />


            {Formik.touched.owner_name && Formik.errors.owner_name && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.owner_name}</p>}

            <TextField
                name='password'
                label="Password"
                type='password'
                value={Formik.values.password}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
            />


            {Formik.touched.password && Formik.errors.password && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.password}</p>}

            <TextField
                name='confirm_password'
                label="Confirm Password"
                type='password'
                value={Formik.values.confirm_password}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
            />


            {Formik.touched.confirm_password && Formik.errors.confirm_password && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.confirm_password}</p>}

            <Button type='submit' variant='content'> Submit </Button>

        </Box>
    );
}