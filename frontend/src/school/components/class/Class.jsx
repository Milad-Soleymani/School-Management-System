import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { classSchema } from "../../../yupSchema/classSchema";
import axios from "axios";
import {baseApi} from '../../../enviorment'

export default function Class() {
    const Formik =useFormik({
        initialValues:{class_text:'', class_num: ""},
        validationSchema: classSchema,
        onSubmit:(values)=> {
            console.log(values)
            axios.post(`${baseApi}/class/create`, {...values}).then(res => {
                console.log('Class add response', res)
            }).catch(Err => {
                console.log("Error in class ",Err)

            })
            Formik.resetForm();
        }

    })

    return (
        <>
            <h1> کلاس </h1>
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



                <Typography variant='h4' sx={{ textAlign: 'center',fontWeight: 700 }}>اضافه کردن کلاس جدید</Typography>

                <TextField
                    name='class_text'
                    label="Class Text"
                    value={Formik.values.class_text}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                />


                {Formik.touched.class_text && Formik.errors.class_text && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.class_text}</p>}

                <TextField
                    name='class_num'
                    label="class Number"
                    value={Formik.values.class_num}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                />


                {Formik.touched.class_num && Formik.errors.class_num && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.class_num}</p>}

                <Button type='submit' variant='content' sx={{bgcolor: '#106FD5', color: 'white',}}> Submit </Button>

            </Box>
        
        </>
    )
}