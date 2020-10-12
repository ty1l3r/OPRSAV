import {createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import React from "react";
import {MuiThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#4444',
        },
        secondary: {
            main: green[700],
        },

        info : {
            light: '#fff',
            main: '#fff',
            dark: '#fff'
        }

    },
});

const DefaultThemeProvider = (props) => {
    return (
        <MuiThemeProvider theme={theme}>
            {props.children}
        </MuiThemeProvider>
    );
};
export default DefaultThemeProvider;