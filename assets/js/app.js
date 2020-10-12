import React from 'react';
import ReactDOM from 'react-dom';
import DefaultThemeProvider from "./components/themes/DefaultThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import '../css/app.css';
import {makeStyles} from "@material-ui/styles";
import {BrowserRouter as Router} from 'react-router-dom';
import '../css/boostrap.min.css';
import Routing from "./Routing";


const useStyles = makeStyles(theme => ({
    divider: theme.mixins.toolbar,
}))

export const HomeRoute = "/";
export const Propos = '/a-propos'

export default function App() {

    const classes = useStyles();

    return (
        <div>
            <div className={classes.divider}/>
            <Router><Routing/></Router>
        </div>

    );
};

ReactDOM.render(
    <DefaultThemeProvider>
        <CssBaseline/>
        <App/>
    </DefaultThemeProvider>, document.getElementById('root'));

