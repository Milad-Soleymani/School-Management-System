/* eslint-disable react/prop-types */
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function MessageSnackbar({ message, type, handleClose }) {

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
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
