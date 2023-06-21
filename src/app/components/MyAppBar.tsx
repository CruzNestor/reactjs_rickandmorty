import { styled} from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    drawerWidth: number;
}
  
const MyAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth'
})<AppBarProps>(({theme, open, drawerWidth}) => ({
    backgroundColor: 'white',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        [theme.breakpoints.up("md")]: {
            width: `calc(100% - ${drawerWidth}px)`
        }
    })
}));

export default MyAppBar