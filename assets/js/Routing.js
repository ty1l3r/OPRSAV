import React from 'react';
import {HashRouter, Route, withRouter} from "react-router-dom";
import Accueil from "./Pages/Accueil/Accueil";
import NavBar from "./components/NavBar/NavBar";
import HomeSellers from "./Pages/Sellers/HomeSellers";

export const HomeRoute = "/";
export const Sellers = "/vendeurs";
export const Propos = "/a-propos/";

class Routing extends React.Component {
    render() {
        return (
            <HashRouter>
                <NavBar/>
                <main>
                    <Route path={HomeRoute} exact component={Accueil}/>
                    <Route path={Sellers} exact component={HomeSellers}/>
                </main>
            </HashRouter>

        );
    }
}
export default withRouter(Routing);