import { useState } from 'react';
import { Box, Divider, Drawer, IconButton, List, Toolbar, Typography, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MainContent from './MainContent';
import MenuIcon from '@mui/icons-material/Menu';
import MyAppBar from './MyOldAppBar';
import ListItemLink from './OldListItemLink';

const drawerWidth = 240;

export default function Root() {
  const [open, setOpen] = useState(window.innerWidth <= 760 ? false : true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const myListItem : Record<string, string>[] = [
    {name: 'Home', link: '/'},
    {name: 'Characters', link: '/characters'}
  ]

  window.addEventListener('resize', () => {
    setScreenWidth(window.innerWidth)
  })

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleCloseDrawerMobile = () => {
    if(window.innerWidth <= 760){
      setOpen(false)
    }
  }

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  }));

  return (
    <Box sx={{ display: 'flex', padding: 0 }}>
      {/* Appbar */}
      <MyAppBar position="fixed" elevation={0} drawerWidth={drawerWidth} open={open}>
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
      <Box 
        component="nav" 
        aria-label="mailbox folders" 
        sx={{ 
          flexShrink: { sm: 0 },
          width: { sm: drawerWidth }, 
        }}
      >
        <Drawer
          open={open}
          onClose={handleDrawerToggle}
          variant={screenWidth <= 900 ? 'temporary': 'persistent'}
          ModalProps={{
            keepMounted: screenWidth <= 900 ? true : false
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box', 
              width: drawerWidth
            }
          }}
        >
          <DrawerHeader>
            <Typography variant="h6" noWrap component="div" color="MenuText">
              Rick and Morty API
            </Typography>
          </DrawerHeader>

          <Divider />

          <List>
            {myListItem.map((element) => (
              <ListItemLink 
                key={element.link} 
                to={element.link} 
                primary={element.name} 
                onPressedItem={handleCloseDrawerMobile}
              />
            ))}
          </List>
          
        </Drawer>
      </Box>
      {/* End Drawer */}

      {/* MainContent */}
      <MainContent drawerWidth={drawerWidth} open={open}>
        <Toolbar />
        <Outlet />
      </MainContent>
      {/* End MainContent */}
    </Box>
  );
}