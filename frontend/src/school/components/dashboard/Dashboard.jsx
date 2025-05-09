import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { baseApi } from "../../../enviorment"
import { Box, Button, CardMedia, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
import MessageSnackbar from "../../../basic utility component/snackbar/MessageSnackbar";
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [schoolName, setSchoolName] = useState('');
    const [school, setSchool] = useState(null);
    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const fileInputRefrence = useRef(null);

    const addImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageUrl(URL.createObjectURL(file));
            setFile(file);
        }
    }

    const handleClearFile = () => {
        if (fileInputRefrence.current) {
            fileInputRefrence.current.value = ''
        }
        setFile(null);
        setImageUrl(null);
    }

    const handleEditSubmit = () => {
        const fd = new FormData();
        fd.append("school_name", schoolName);
        if (file) {
            fd.append("image", file, file.name);
        }

        axios.patch(`${baseApi}/school/update`, fd)
            .then(res => {
                console.log("School edit", res);
                setMessage("ویرایش با موفقیت انجام شد");
                setMessageType('success');
                fetchSchool(); // برای دریافت داده‌های به‌روزرسانی شده
                setTimeout(() => {
                    cancelEdit(); // بستن حالت ویرایش بعد از 2 ثانیه
                }, 1000);
            })
            .catch(e => {
                console.log(e);
                setMessage("خطا در ویرایش اطلاعات");
                setMessageType('error');
            });
    }

    const cancelEdit = () => {
        setEdit(false);
        handleClearFile();
        // بازگرداندن مقادیر قبلی
        if (school) {
            setSchoolName(school.school_name);
        }
    }

    const handleMessageClose = () => {
        setMessage('');
        setMessageType('');
    }

    const fetchSchool = () => {
        axios.get(`${baseApi}/school/fetch-single`)
            .then((res) => {
                setSchool(res.data.school);
                setSchoolName(res.data.school.school_name);
                setMessage(res.data.message || "اطلاعات با موفقیت دریافت شد");
                setMessageType('success');
            })
            .catch((e) => {
                setMessage(e.response?.data?.message || "خطا در دریافت اطلاعات");
                setMessageType('error');
                console.log(e);
            });
    }

    useEffect(() => {
        fetchSchool();
    }, []);

    return (
        <>
            <h1>داشبود</h1>
            {message && messageType && (
                <MessageSnackbar message={message} type={messageType} handleClose={handleMessageClose} />
            )}
            
            {edit ? (
                <Box component={'div'} sx={{
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '100%',
                    paddingTop: '60px',
                    paddingBottom: '60px'
                }}>
                    <Typography variant='h2' sx={{ textAlign: 'center', marginBottom: "50px", color: 'black' }}>ویرایش مدرسه</Typography>

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
                            padding: 3,
                            borderRadius: 2
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography>تصویر مدرسه</Typography>
                        <TextField
                            type='file'
                            inputRef={fileInputRefrence}
                            onChange={addImage}
                            accept="image/*"
                        />
                        {imageUrl && (
                            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                                <CardMedia 
                                    component={"img"} 
                                    height='240' 
                                    image={imageUrl} 
                                    alt="پیش‌نمایش تصویر مدرسه"
                                    sx={{ objectFit: 'contain' }}
                                />
                            </Box>
                        )}

                        <TextField
                            label="نام مدرسه"
                            value={schoolName || ''}
                            onChange={(e) => setSchoolName(e.target.value)}
                            fullWidth
                            margin="normal"
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                            <Button 
                                variant="contained" 
                                color="error" 
                                onClick={cancelEdit}
                            >
                                انصراف
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handleEditSubmit}
                            >
                                ذخیره تغییرات
                            </Button>
                        </Box>
                    </Box>
                </Box>
            ) : school && (
                <Box sx={{
                    position: 'relative',
                    height: '500px',
                    width: '100%',
                    background: school.school_image 
                        ? `url(/images/uploaded/school/${school.school_image})`
                        : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>
                    <Typography variant='h3'>{school.school_name}</Typography>
                    <Box sx={{ 
                        position: 'absolute', 
                        bottom: '10px', 
                        right: '10px' 
                    }}>
                        <Button 
                            sx={{ 
                                borderRadius: '50%', 
                                color: 'black', 
                                background: '#fff', 
                                height: '60px',
                                width: '60px',
                                minWidth: 0,
                                '&:hover': { background: '#f5f5f5' }
                            }} 
                            onClick={() => setEdit(true)}
                            aria-label="ویرایش"
                        >
                            <EditIcon fontSize="medium" />
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    )
}