import * as React from 'react';
import AppBar from '@mui/material/AppBar'; // 📦 وارد کردن کامپوننت AppBar از MUI
import Box from '@mui/material/Box'; // 📦 وارد کردن کامپوننت Box از MUI
import Toolbar from '@mui/material/Toolbar'; // 📦 وارد کردن کامپوننت Toolbar از MUI
import IconButton from '@mui/material/IconButton'; // 📦 وارد کردن کامپوننت IconButton از MUI
import Typography from '@mui/material/Typography'; // 📦 وارد کردن کامپوننت Typography از MUI
import Menu from '@mui/material/Menu'; // 📦 وارد کردن کامپوننت Menu از MUI
import MenuIcon from '@mui/icons-material/Menu'; // 📦 وارد کردن MenuIcon از آیکون‌های MUI
import Container from '@mui/material/Container'; // 📦 وارد کردن کامپوننت Container از MUI
import AdbIcon from '@mui/icons-material/Adb'; // 📦 وارد کردن AdbIcon از آیکون‌های MUI
import Button from '@mui/material/Button'; // 📦 وارد کردن کامپوننت Button از MUI
import { useNavigate } from 'react-router-dom'; // 📦 وارد کردن هوک useNavigate برای جابجایی بین صفحات
import { MenuItem } from '@mui/material';

// 📝 تعریف صفحات برای نوار ناوبری | Defining the pages for the navigation bar
const pages = [
    { link: '/', component: 'خانه' }, // Home | صفحه اصلی
    { link: '/login', component: 'ورود' }, // Login | صفحه ورود
    { link: '/register', component: 'ثبت نام' }, // Register | صفحه ثبت نام
];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null); // 📝 حالت برای کنترل منو | State for controlling the menu anchor element

    // 📝 هندلر برای باز کردن منو | Handler for opening the menu
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const navigate = useNavigate(); // 📝 استفاده از هوک useNavigate برای جابجایی بین صفحات | Using useNavigate hook to navigate between pages

    // 📝 هندلر برای بستن منو و جابجایی به صفحه انتخاب شده | Handler for closing the menu and navigating to the selected page
    const handleCloseNavMenu = (link) => {
        setAnchorElNav(null); // 📝 بستن منو | Close the menu
        navigate(link); // 📝 جابجایی به لینک انتخاب شده | Navigate to the selected link
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* آیکون لوگو برای صفحه‌نمایش‌های بزرگ | Logo icon for large screens */}
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                    {/* عنوان اصلی برای صفحه‌نمایش‌های بزرگ | Main title for large screens */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        سامانه مدیریت مدرسه | SCHOOL MANAGEMENT SYSTEM
                    </Typography>

                    {/* دکمه منو برای صفحه‌نمایش‌های کوچک | Mobile menu button for small screens */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => setAnchorElNav(null)} // بستن منو | Closing the menu
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page, i) => (
                                <MenuItem key={i} onClick={() => handleCloseNavMenu(page.link)}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.component}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* آیکون لوگو برای صفحه‌نمایش‌های کوچک | Logo icon for small screens */}
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    {/* عنوان اصلی برای صفحه‌نمایش‌های کوچک | Main title for small screens */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        لوگو | LOGO
                    </Typography>

                    {/* دکمه‌های ناوبری برای صفحه‌نمایش‌های بزرگ | Navigation buttons for large screens */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, i) => (
                            <Button
                                key={i}
                                onClick={() => handleCloseNavMenu(page.link)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.component}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
