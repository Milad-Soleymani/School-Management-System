import * as React from 'react';
import { Box } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

export default function Gallery() {

  const [open, setOpen] = React.useState(false);
  const [selectedSchool, setSelectedSchool] = React.useState(null);
  const [schools, setSchools] = React.useState([])

  const handleOpen = (school) => {
    setOpen(true);
    setSelectedSchool(school)

  }

  const handleClose = () => {
    setOpen(false);
    setSelectedSchool(null);
  }



  React.useEffect(() => {
    axios.get('http://localhost:5000/api/school/all').then(res => {
      console.log("school", res.data)
      setSchools(res.data.schools)
      
    }).catch(e => {
      console.log(e);
    })


  }, [])

  return (
    <Box>
      <Typography variant='h4' sx={{textAlign: 'center', marginTop: '40px',marginBottom: "20px" }}>Registered Schools</Typography>
      <ImageList sx={{ width: '100%', height: 'auto' }}>
        {schools.map((school) => (
          <ImageListItem key={school.school_image}>
            <img
              srcSet={`./images/uploaded/school/${school.school_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`./images/uploaded/school/${school.school_image}?w=248&fit=crop&auto=format`}
              alt={school.school_name}
              loading="lazy"
              onClick={() => { handleOpen(school) }}
            />
            <ImageListItemBar
              title={school.school_name}
            />
          </ImageListItem>
        ))}
      </ImageList>


        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box component={'div'} sx={{position: 'absolute', top: '50%', left: '50%',
            transform:'translate(-50%, -50%)',
            background: '#fff',
            border: 'none',
            outline: 'none',
            padding: '10px',

          }}>
            <Typography>{selectedSchool && selectedSchool.school_name}</Typography>
            <img
              // srcSet={`/images/uploaded/school/${selectedSchool && selectedSchool.img}`}
              src={selectedSchool && `/images/uploaded/school/${selectedSchool.school_image}`}
              style={{maxHeight:"80vh"}}
              alt={"alt"}
            />
          </Box>
        </Modal>


    </Box>
  );
}
