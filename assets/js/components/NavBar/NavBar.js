import React, {useContext, useState} from 'react';
import './Navbar.css';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar,
} from '@material-ui/core';
import {Menu as MenuIcon} from '@material-ui/icons';
import AuthAPI from '../../Services/authAPI'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from '@material-ui/icons/Home';
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import AuthContext from "../../contexts/AuthContext";


const useStyles = makeStyles(style => ({
    menuIcon: {marginRight: style.spacing(0)},
    list: {width: '210px', height: '30px'},
    menu: {marginLeft: '30px'},
    align: {marginLeft: "12px"},
    top: {marginTop: '27.3%'},
    color: {color: "white"},
}))

const NavBar = ({ history }) => {

    //utilisation du context
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    //styles
    const classes = useStyles();
    //state
    const [drawerOpen, setDrawerOpen] = useState(false);
    //functions
    const toogleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    };

    //Fonction de déconnexion
    const handleLogout = () => {
            AuthAPI.logout();
            setIsAuthenticated(false);
            history.push("/")
    };

    return (
        <AppBar position="fixed" className='adjust'>
            <Toolbar>
                <IconButton onClick={toogleDrawer} className={classes.menuIcon}
                            edge="start">
                    <MenuIcon/>
                </IconButton>
                <Link to="/" underline="none" color="inherit" variant="h6">
                </Link>
                <Box flexGrow={1}/>

                {isAuthenticated &&
                <>
                    <Button onClick={handleLogout} size="large">
                            LogOut
                    </Button>
                </>
                ||
                <></>
                }

                <Drawer anchor="left" variant="temporary" onClose={toogleDrawer} open={drawerOpen}>
                    <List className={classes.list} component="nav" aria-label="main mailbox folders">
                        {/*--------------------------------------------------------------------------------*/}
                        <Divider className={classes.top}/>

                        <ListItem onClick={toogleDrawer}>
                            <ListItemIcon>
                                <Avatar>
                                    <HomeIcon className={classes.color}/>
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText className={classes.align} primary="LoginPage"/>
                        </ListItem>
                        <Divider/>
                        {/*--------------------------------------------------------------------------------*/}
                        <ListItem onClick={toogleDrawer}>
                            <ListItemIcon>
                                <Avatar>
                                    <HomeIcon className={classes.color}/>
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText className={classes.align} primary="SERVICES"/>
                        </ListItem>
                        <Divider/>
                        {/*--------------------------------------------------------------------------------*/}
                        <ListItem  onClick={toogleDrawer}>
                            <ListItemIcon>
                                <Avatar>
                                    <ContactPhoneIcon className={classes.color}/>
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText className={classes.align} primary="A Propos"/>
                        </ListItem>
                        <Divider/>
                        {/*--------------------------------------------------------------------------------*/}
                        <ListItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Avatar>
                                    <ContactPhoneIcon className={classes.color}/>
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText className={classes.align} primary="Déconnexion"/>
                        </ListItem>

                    </List>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
