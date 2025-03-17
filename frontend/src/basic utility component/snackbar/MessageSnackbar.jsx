/* eslint-disable react/prop-types */
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';

export default function MessageSnackbar({ message, type, handleClose }) {

  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {type}
      <Snackbar
        open={true}
        autoHideDuration={1600}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant='filled'
          sx={{ width:"100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
