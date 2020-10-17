import React from 'react';
import {HashRouter, Route, withRouter} from "react-router-dom";
import Accueil from "./Pages/Accueil/Accueil";
import NavBar from "./components/NavBar/NavBar";
import HomeSellers from "./Pages/Sellers/HomeSellers";
import Customers from "./Pages/Customers/Customers";
import CustomersPage from "./Pages/Customers/CustomersPage";
import Equipments from "./Pages/Equipments/Equipments";

export const HomeRoute = "/";
export const Clients = "/clients";
export const Produits = "/produits";
export const Sellers = "/vendeurs";
export const Propos = "/a-propos/";

class Routing extends React.Component {
    render() {
        return (
            <HashRouter>
                <NavBar/>
                <main>
                    <Route path={HomeRoute} exact component={Accueil}/>
                    <Route path={Clients} exact component={Customers}/>
                    <Route path={Produits} exact component={Equipments}/>
                    <Route path={Sellers} exact component={HomeSellers}/>
                </main>
            </HashRouter>

        );
    }
}
export default withRouter(Routing);