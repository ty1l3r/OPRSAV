import React from 'react';
import conductor from './conductor.png';
import './images.css'
import {makeStyles} from "@material-ui/styles";

const usesStyles = makeStyles({
    backgroundImage: {
        flex: 1,
/*        width: null,
        height: null,*/
        /*resizeMode: 'cover'*/
    }
});

const Conductor = () => {

    const classes = usesStyles();

    return <img className='conductor' src={conductor} alt=""/>
}

export default Conductor;