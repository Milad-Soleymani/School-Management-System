import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#3f51b5", // رنگ پس زمینه
                padding: "20px",
                marginTop: "auto", // باعث می‌شود فوتر همیشه در پایین صفحه باشد
                color: "white", // رنگ متن سفید
            }}
            component="div"
        >
            {/* عنوان سیستم مدیریت مدرسه */}
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                سیستم مدیریت مدرسه
            </Typography>
            <Typography variant="body2">
                Copyright 2025 &#169; School Management System
            </Typography>
        </Box>
    );
}
