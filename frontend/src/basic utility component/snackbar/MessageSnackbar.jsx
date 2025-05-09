/* eslint-disable react/prop-types */
import Snackbar from '@mui/material/Snackbar'; // 📦 Importing Snackbar component from MUI | وارد کردن کامپوننت Snackbar از MUI
import { Alert } from '@mui/material'; // 📦 Importing Alert component from MUI | وارد کردن کامپوننت Alert از MUI

// ✅ MessageSnackbar component: Displays a message based on the type (success, error, etc.) | کامپوننت MessageSnackbar: نمایش پیام بر اساس نوع (موفقیت، خطا و غیره)
export default function MessageSnackbar({ message, type, handleClose }) {
  return (
    <div>
      {/* Show the alert type (for debugging) | نمایش نوع هشدار (برای اشکال‌زدایی) */}
      {type}

      {/* Snackbar component to display the alert message | کامپوننت Snackbar برای نمایش پیام هشدار */}
      <Snackbar
        open={true} // Snackbar is always open | همیشه باز است
        autoHideDuration={1600} // Duration before automatically closing the Snackbar | مدت زمانی که Snackbar خود به خود بسته می‌شود
        onClose={handleClose} // Close action handler | هندلر برای بستن
      >
        <Alert
          onClose={handleClose} // Close action for the alert | عمل بستن هشدار
          severity={type} // Alert severity level (error, success, etc.) | سطح شدت هشدار (خطا، موفقیت و غیره)
          variant='filled' // Filled variant style for the alert | استایل پر شده برای هشدار
          sx={{ width: "100%" }} // Set the width of the alert to 100% | تنظیم عرض هشدار به 100%
        >
          {message} {/* Display the passed message | نمایش پیام ارسال شده */}
        </Alert>
      </Snackbar>
    </div>
  );
}
