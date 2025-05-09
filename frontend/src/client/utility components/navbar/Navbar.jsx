import * as React from 'react';
import AppBar from '@mui/material/AppBar'; // 📦 Importing AppBar component from MUI | وارد کردن کامپوننت AppBar از MUI
import Box from '@mui/material/Box'; // 📦 Importing Box component from MUI | وارد کردن کامپوننت Box از MUI
import Toolbar from '@mui/material/Toolbar'; // 📦 Importing Toolbar component from MUI | وارد کردن کامپوننت Toolbar از MUI
import IconButton from '@mui/material/IconButton'; // 📦 Importing IconButton component from MUI | وارد کردن کامپوننت IconButton از MUI
import Typography from '@mui/material/Typography'; // 📦 Importing Typography component from MUI | وارد کردن کامپوننت Typography از MUI
import Menu from '@mui/material/Menu'; // 📦 Importing Menu component from MUI | وارد کردن کامپوننت Menu از MUI
import MenuIcon from '@mui/icons-material/Menu'; // 📦 Importing MenuIcon from MUI icons | وارد کردن MenuIcon از آیکون‌های MUI
import Container from '@mui/material/Container'; // 📦 Importing Container component from MUI | وارد کردن کامپوننت Container از MUI
import AdbIcon from '@mui/icons-material/Adb'; // 📦 Importing AdbIcon from MUI icons | وارد کردن AdbIcon از آیکون‌های MUI
import Button from '@mui/material/Button'; // 📦 Importing Button component from MUI | وارد کردن کامپوننت Button از MUI
import { useNavigate } from 'react-router-dom'; // 📦 Importing useNavigate hook for navigation | وارد کردن هوک useNavigate برای ناوبری

// 📝 Define the pages for the navigation bar | تعریف صفحات برای نوار ناوبری
const pages = [
    { link: '/', component: 'Home' },
    { link: '/login', component: 'Login' },
    { link: '/register', component: 'Register' },
];

function Navbar() {
    // 📝 State to control menu anchor element | حالت برای کنترل عنصر لنگر منو
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    // 📝 Handle opening the menu | هندلر برای باز کردن منو
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const navigate = useNavigate(); // 📝 useNavigate hook to navigate between pages | استفاده از هوک useNavigate برای جابجایی بین صفحات

    // 📝 Handle closing the menu and navigate to selected page | هندلر برای بستن منو و جابجایی به صفحه انتخاب شده
    const handleCloseNavMenu = (link) => {
        setAnchorElNav(null); // 📝 Close the menu | بستن منو
        navigate(link); // 📝 Navigate to the selected link | جابجایی به لینک انتخاب شده
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo Icon for large screens | آیکون لوگو برای صفحه‌نمایش‌های بزرگ */}
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                    {/* Main title for large screens | عنوان اصلی برای صفحه‌نمایش‌های بزرگ */}
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
                        SCHOOL MANAGEMENT SYSTEM
                    </Typography>

                    {/* Mobile menu button for small screens | دکمه منو برای صفحه‌نمایش‌های کوچک */}
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
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page, i) => (
                                <MenuItem key={i} onClick={() => handleCloseNavMenu(page.link)}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.component}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Logo Icon for small screens | آیکون لوگو برای صفحه‌نمایش‌های کوچک */}
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    {/* Main title for small screens | عنوان اصلی برای صفحه‌نمایش‌های کوچک */}
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
                        LOGO
                    </Typography>

                    {/* Navigation buttons for large screens | دکمه‌های ناوبری برای صفحه‌نمایش‌های بزرگ */}
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
