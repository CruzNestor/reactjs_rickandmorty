import { useState } from 'react';
import { Box, Divider, Drawer, IconButton, List, Toolbar, Typography } from '@mui/material';
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import MyAppBar from './MyAppBar';
import ListItemLink from './ListItemLink';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  paddingLeft: '12px',
  ...theme.mixins.toolbar
}));

export default function Root() {
  const [open, setOpen] = useState(window.innerWidth < 900 ? false : true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const theme = useTheme() 

  const myListItem: Record<string, string>[] = [
    { name: 'Home', link: '/', icon: 'home'},
    { name: 'Characters', link: '/characters', icon: 'person'}
  ]

  window.addEventListener('resize', () => {
    setScreenWidth(window.innerWidth)
  })

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleCloseDrawerMobile = () => {
    if (window.innerWidth <= 760) {
      setOpen(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', padding: 0 }}>
      {/* Appbar */}
      <MyAppBar position="fixed" elevation={0} open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </MyAppBar>
      {/* End Appbar */}

      {/* Drawer */}
        <Drawer
          open={open}
          onClose={handleDrawerToggle}
          variant={screenWidth < 900 ? 'temporary': 'permanent'}
          ModalProps={{
            keepMounted: screenWidth < 900 ? true : false
          }}
          sx={{
            ...(open && {
              ...openedMixin(theme),
              '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
              ...closedMixin(theme),
              '& .MuiDrawer-paper': closedMixin(theme),
            }),
          }}
        >
          <DrawerHeader>
            <Box
              component='img'
              alt="Not found"
              width='40px'
              src={Logo}
            />
            <Typography 
              variant='subtitle1'
              component="div"
              color="MenuText"
              noWrap  
              sx={{
                opacity: open ? 1 : 0,
                paddingLeft: '8px'
              }}
            >
              Rick and Morty
            </Typography>
          </DrawerHeader>

          <Divider />

          <List>
            {myListItem.map((element) => (
              <ListItemLink
                open={open}
                key={element.link}
                to={element.link}
                primary={element.name}
                onPressedItem={handleCloseDrawerMobile}
                icon={element.icon}
              />
            ))}
          </List>

        </Drawer>
      {/* End Drawer */}

      {/* MainContent */}
      <Box component="main" sx={{ backgroundColor: '#EEF2F6', flexGrow: 1 , minHeight: '100vh',}}>
        <Toolbar />
        <Outlet />
      </Box>
      {/* End MainContent */}
    </Box>
  );
}