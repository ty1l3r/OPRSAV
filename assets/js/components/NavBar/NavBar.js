import React, {useState} from 'react';
import './Navbar.css';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar,
} from '@material-ui/core';
import {Menu as MenuIcon} from '@material-ui/icons';
import AccountBoxIcon from '@material-ui/icons/SentimentVerySatisfied';
import BuildIcon from '@material-ui/icons/Build';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from '@material-ui/icons/Home';
import {Link} from "react-router-dom";
import {Clients, HomeRoute} from "../../Routing";



const useStyles = makeStyles(style => ({
    menuIcon: {marginRight: style.spacing(0)},
    list: {width: '210px', height: '30px'},
    menu: {marginLeft: '30px'},
    align: {marginLeft: "12px"},
    top: {marginTop: '27.3%'},
    color: {color: "white"},


}))

const NavBar = () => {
    //styles
    const classes = useStyles();
    //state
    const [drawerOpen, setDrawerOpen] = useState(false);
    //functions
    const toogleDrawer = () => {
        setDrawerOpen(!drawerOpen)
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
                <Button size="large">Login</Button>
                <Drawer anchor="left" variant="temporary" onClose={toogleDrawer} open={drawerOpen}>
                    <List className={classes.list} component="nav" aria-label="main mailbox folders">
                        {/*--------------------------------------------------------------------------------*/}
                        <Divider className={classes.top}/>

                        <ListItem button component={Link} to={HomeRoute}
                                  onClick={toogleDrawer}>
                            <ListItemIcon>
                                <Avatar>
                                    <HomeIcon className={classes.color}/>
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText className={classes.align} primary="Accueil"/>
                        </ListItem>
                        <Divider/>

                        {/*--------------------------------------------------------------------------------*/}
                        <ListItem  onClick={toogleDrawer}>
                            <ListItemIcon>
                                <Avatar>
                                    <AccountBoxIcon className={classes.color}/>
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText className={classes.align} primary="Créer un devis"/>
                        </ListItem>
                        <Divider/>
                        {/*--------------------------------------------------------------------------------*/}
                        <ListItem button to="/" onClick={toogleDrawer}>
                            <ListItemIcon>
                                <Avatar>
                                    <BuildIcon className={classes.color}/>
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText className={classes.align} primary="Créer une facture"/>
                        </ListItem>
                        <Divider/>
                        {/*--------------------------------------------------------------------------------*/}
                        <ListItem button to="/" onClick={toogleDrawer}>
                            <ListItemIcon>
                                <Avatar>
                                    <ImportantDevicesIcon className={classes.color}/>
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText className={classes.align} primary="Liste des devis"/>
                        </ListItem>
                        <Divider/>
                        {/*--------------------------------------------------------------------------------*/}
                        <ListItem button to="/"
                                  onClick={toogleDrawer}>
                            <ListItemIcon>
                                <Avatar>
                                    <ThumbUpAltIcon className={classes.color}/>
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText className={classes.align} primary="Liste des factures"/>
                        </ListItem>
                        <Divider/>
                        {/*--------------------------------------------------------------------------------*/}
                        <ListItem button component={Link} to={Clients}
                                  onClick={toogleDrawer}>
                            <ListItemIcon>
                                <Avatar>
                                    <ContactPhoneIcon className={classes.color}/>
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText className={classes.align} primary="Liste des clients"/>
                        </ListItem>
                        <Divider/>
                        {/*--------------------------------------------------------------------------------*/}
                        <ListItem button to="/" onClick={toogleDrawer}>
                            <ListItemIcon>
                                <Avatar>
                                    <ContactPhoneIcon className={classes.color}/>
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText className={classes.align} primary="A Propos"/>
                        </ListItem>
                    </List>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
