import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth: number;
}

const MyAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth'
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  backgroundColor: 'white',
  [theme.breakpoints.up("sm")]: {
    marginLeft: `-${drawerWidth}px`,
    width: `100%`
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: `-${drawerWidth}px`,
    width: `calc(100% - ${theme.spacing(7)} + 1px)`,
  },
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: `${drawerWidth}px`,
    [theme.breakpoints.up("sm")]: {
      width: `100%`
    },
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
  })
}));

export default MyAppBar