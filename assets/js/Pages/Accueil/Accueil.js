import React, {Fragment} from 'react';
import './Accueil.css';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import {Divider} from "@material-ui/core";
import LoginPage from "../Login/LoginPage";



const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


const Accueil = () => {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (

<Fragment>
    <div className="container mt-2 text-center">

{/*                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Nous vous souhaitons une bonne journée !
                </Typography>
                <Divider className="divider"/>
                <Typography variant="h5" component="h2">
                    {bull}Bienvenue sur votre interface SAVPRO{bull}
                </Typography>
                <Divider className="divider"/>*/}

                <LoginPage/>


    </div>

</Fragment>



    );
};

export default Accueil;
