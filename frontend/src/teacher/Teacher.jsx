/* eslint-disable no-unused-vars */
// 📝 فایل Teacher برای داشبورد معلم | Teacher Dashboard Component for School Management (Teacher)

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// ! آیکون‌ها | Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExplicitIcon from '@mui/icons-material/Explicit';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HomeIcon from '@mui/icons-material/Home';

import { Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 240; // 📏 عرض منوی کناری | Sidebar width

// 🎨 استایل باز شدن منو
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// 🎨 استایل بسته بودن منو
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// 🧱 هدر منو برای دکمه بستن
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// 📌 AppBar سفارشی
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// 📌 Drawer سفارشی (منوی کناری)
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Teacher() {
  const theme = useTheme(); // 🎨 استفاده از تم متریال
  const [open, setOpen] = React.useState(false); // 🔓 وضعیت باز/بسته بودن منو
  const navigate = useNavigate(); // 🔀 هدایت کاربر

  const handleDrawerOpen = () => {
    setOpen(true); // ⬅️ باز کردن منو
  };

  const handleDrawerClose = () => {
    setOpen(false); // ➡️ بستن منو
  };

  // 📚 مسیرهای منو برای معلم
  const navArr = [
    { link: '/', component: 'خانه', icon: HomeIcon },
    { link: '/teacher/schedule', component: 'برنامه کلاسی', icon: EventIcon },
    { link: '/teacher/attendance', component: 'حضور و غیاب', icon: RecentActorsIcon },
    { link: '/teacher/examinations', component: 'امتحانات', icon: ExplicitIcon },
    { link: '/teacher/notice', component: 'اطلاعیه‌ها', icon: NotificationsIcon },
  ];

  // 🧭 عملکرد کلیک روی آیتم‌های منو
  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <Box sx={{ display: 'flex', direction: 'rtl' }}>
      <CssBaseline /> {/* 🔧 ریست استایل‌ها */}
      
      {/* 🔷 نوار بالایی */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="end"
            sx={{
              marginLeft: 2,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            سامانه معلم
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 🟦 منوی کناری */}
      <Drawer variant="permanent" anchor="right" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* 🔄 رندر کردن آیتم‌های منو */}
          {navArr.map((navItem, index) => {
            const Icon = navItem.icon;
            return (
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => handleNavigation(navItem.link)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon /> {/* 🎯 آیکون هر آیتم */}
                  </ListItemIcon>
                  <ListItemText
                    primary={navItem.component}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* 🟩 محتوای اصلی صفحه */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader /> {/* جای خالی برای Toolbar */}
        <Outlet /> {/* 📤 خروجی برای روت‌های داخلی */}
      </Box>
    </Box>
  );
}
