import { styled } from '@mui/material/styles';

const MainContent = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth'}
)<{open?: boolean, drawerWidth: number}>(({ theme, open, drawerWidth }) => ({
    backgroundColor: '#EEF2F6',
    flexGrow: 1,
    minHeight: '100vh',
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('xs')]: {
        marginLeft: 0
    },
    [theme.breakpoints.up('sm')]: {
        marginLeft: `-${drawerWidth}px`
    },
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up('sm')]: {
            marginLeft: `-${drawerWidth}px`
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: 0
        },

    }),
}));

export default MainContent