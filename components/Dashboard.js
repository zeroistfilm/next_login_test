import React, {useState, useContext} from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
//import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
//import Chart from './Chart';
//import Deposits from './Deposits';
//import Orders from './Orders';

/// 
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
///
import {Nav} from 'components';
import {NavLink} from '.';
import {func} from "prop-types";
import axios from "axios";
import {fetchWrapper} from "../helpers";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



export default function Dashboard() {

    const mdTheme = createTheme();

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const onRefresh = () => {
        const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
        const url = `${baseUrl}/auth/refresh`;

        fetchWrapper.get(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            });


    }
    return (
        <ThemeProvider theme={mdTheme}>
            <>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <AppBar position="absolute" open={open} style={{background: '#2E3B55'}}>
                        <Toolbar
                            sx={{
                                pr: '24px', // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && {display: 'none'}),
                                }}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{flexGrow: 1}}
                            >
                                DropBase Dashboard
                            </Typography>

                            <IconButton color="inherit">
                                <Badge badgeContent={1} color="secondary">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>

                            <Nav/>

                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </Toolbar>
                        <Divider/>
                        <List component="nav">
                            <NavLink href="/" className="nav-item nav-link">
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DashboardIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard"/>
                                </ListItemButton>
                            </NavLink>

                            <ListItemButton>
                                <ListItemIcon>
                                    <ShoppingCartIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Orders"/>
                            </ListItemButton>

                            <NavLink href="/users" className="nav-item nav-link">
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PeopleIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="UsersManager"/>
                                </ListItemButton>
                            </NavLink>

                            <ListItemButton>
                                <ListItemIcon>
                                    <BarChartIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Reports"/>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LayersIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Integrations"/>
                            </ListItemButton>
                            <Divider sx={{my: 1}}/>
                            <ListSubheader component="div" inset>
                                Saved reports
                            </ListSubheader>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Current month"/>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Last quarter"/>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Year-end sale"/>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={onRefresh} primary="refresh"/>
                            </ListItemButton>

                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar/>
                        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                            <Grid container spacing={3}>
                                {/* Chart */}
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                        }}
                                    >
                                        {/* Chart */}
                                    </Paper>
                                </Grid>
                                {/* Recent Deposits */}
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                        }}
                                    >
                                        {/* Deposits */}
                                    </Paper>
                                </Grid>
                                {/* Recent Orders */}
                                {/*<Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders/>
                </Paper>
              </Grid>*/}
                            </Grid>
                            {/*<Copyright sx={{ pt: 4 }} />*/}
                        </Container>
                    </Box>
                </Box>
            </>
        </ThemeProvider>
    )
} 