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
import { Outlet, useNavigate } from 'react-router-dom';

// آیکون‌های منو / Menu Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SubjectIcon from '@mui/icons-material/Subject';
import ExplicitIcon from '@mui/icons-material/Explicit';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

// میکسین باز شدن کشو / Opened drawer styles
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// میکسین بسته شدن کشو / Closed drawer styles
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

// کامپوننت هدر کشو / Drawer Header Component
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// کامپوننت نوار بالا / AppBar Component
const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  })
);

// کامپوننت کشو / Drawer Component (منو به سمت راست)
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
  })
);

export default function School() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // باز کردن کشو / Open drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // بستن کشو / Close drawer
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  // آرایه ناوبری شامل آیکون‌ها / Navigation array with icons
  const navArr = [
    { link: '/', component: 'خانه', icon: HomeIcon },
    { link: '/school', component: 'داشبورد', icon: DashboardIcon },
    { link: '/school/class', component: 'کلاس‌ها', icon: FormatListNumberedIcon },
    { link: '/school/subjects', component: 'درس‌ها', icon: SubjectIcon },
    { link: '/school/students', component: 'دانش‌آموزان', icon: PeopleIcon },
    { link: '/school/teachers', component: 'معلم‌ها', icon: PeopleAltIcon },
    { link: '/school/schedule', component: 'برنامه هفتگی', icon: EventIcon },
    { link: '/school/attendance', component: 'حضور و غیاب', icon: RecentActorsIcon },
    { link: '/school/examinations', component: 'امتحانات', icon: ExplicitIcon },
    { link: '/school/notice', component: 'اطلاعیه‌ها', icon: NotificationsIcon },
  ];

  // عملکرد ناوبری / Navigation handler
  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <Box sx={{ display: 'flex', direction: 'rtl' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ position: 'relative' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            سامانه مدیریت مدرسه
          </Typography>
          {/* دکمه باز شدن منو با موقعیت‌دهی مطلق در سمت راست */}
          {!open && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              sx={{ position: 'absolute', right: 16 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {/* اضافه کردن anchor="right" جهت نمایش منو در سمت راست */}
      <Drawer variant="permanent" open={open} anchor="right">
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
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
                    ml: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {<navItem.icon />}
                </ListItemIcon>
                <ListItemText primary={navItem.component} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
