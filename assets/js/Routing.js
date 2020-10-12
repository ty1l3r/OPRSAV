import React from 'react';
import {HashRouter, Route, withRouter} from "react-router-dom";
import Accueil from "./components/Pages/Accueil/Accueil";
import NavBar from "./components/NavBar/NavBar";

export const HomeRoute = "/";
export const Propos = "/a-propos/";

class Routing extends React.Component {
    render() {
        return (
            <HashRouter>
                <NavBar/>
                <main>
                    <Route path={HomeRoute} exact component={Accueil}/>
                </main>
            </HashRouter>

        );
    }
}
export default withRouter(Routing);