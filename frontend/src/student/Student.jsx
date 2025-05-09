/* eslint-disable no-unused-vars */
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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// ! آیکون‌ها
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExplicitIcon from '@mui/icons-material/Explicit';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HomeIcon from '@mui/icons-material/Home';

import { Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 240; // عرض کشوی کناری (Drawer)

/**
 * باز کردن کشو در حالت کامل
 */
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

/**
 * بستن کشو به حالت کوچک
 */
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

/**
 * هدر بالای کشو
 */
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

/**
 * نوار بالا (AppBar) با تغییر عرض هنگام باز و بسته بودن کشو
 */
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

/**
 * کشوی کناری (Drawer) راست‌چین
 */
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

/**
 * کامپوننت اصلی داشبورد دانش‌آموز
 */
export default function Student() {
  const theme = useTheme(); // گرفتن تم برای دسترسی به تنظیمات MUI
  const [open, setOpen] = React.useState(false); // وضعیت باز یا بسته بودن کشو
  const navigate = useNavigate(); // برای مسیریابی

  // باز کردن کشو
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // بستن کشو
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // آرایه مسیرها و آیکون‌های داشبورد
  const navArr = [
    { link: '/', component: 'خانه', icon: HomeIcon },
    { link: '/student', component: 'اطلاعات شما', icon: DashboardIcon },
    { link: '/student/schedule', component: 'برنامه‌ هفتگی', icon: EventIcon },
    { link: '/student/attendance', component: 'حضور و غیاب', icon: RecentActorsIcon },
    { link: '/student/examinations', component: 'امتحانات', icon: ExplicitIcon },
    { link: '/student/notice', component: 'اعلان‌ها', icon: NotificationsIcon },
  ];

  // تغییر مسیر هنگام کلیک روی هر گزینه
  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <Box sx={{ display: 'flex', direction: 'rtl' }}>
      <CssBaseline />
      {/* نوار بالا */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginLeft: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            سامانه مدیریت مدرسه
          </Typography>
        </Toolbar>
      </AppBar>

      {/* کشوی سمت راست */}
      <Drawer variant="permanent" anchor="right" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* منوها */}
        <List>
          {navArr.map((navItem, index) => (
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
                  <navItem.icon />
                </ListItemIcon>
                <ListItemText
                  primary={navItem.component}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* محتوای اصلی */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
