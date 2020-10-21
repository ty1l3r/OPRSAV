import React, {useState} from 'react';
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import LoginPage from "./Pages/Accueil/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import Customers from "./Pages/Customers/Customers";
import AuthAPI from "./Services/authAPI"
import Equipments from "./Pages/Equipments/Equipments";
import HomeSellers from "./Pages/Sellers/HomeSellers";
import AuthContext from "./contexts/AuthContext";
import HomeAdmin from "./Pages/Admin/HomeAdmin";
import HomeTeck from "./Pages/Tech/HomeTeck";
import Quotation from "./Pages/Sellers/Quotation";
import QuotationsPage from "./Pages/Sellers/Quotations/QuotationsPage";


AuthAPI.setup();

//Factorisation private route
const PrivateRoute = ({path, isAuthenticated, component}) =>
    isAuthenticated ? (
        <Route path={path} component={component}/>
    ) : (
        <Redirect to="/"/>);

const Routing = () => {
    //Envoyer du state horsRoute
    const NavbarWithRouter = withRouter(NavBar);
    //STATE d'authentification
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
    //Valeur du context
    const contextValue = {isAuthenticated, setIsAuthenticated}

    return (
        <AuthContext.Provider value={contextValue}>
            <HashRouter>
                <NavbarWithRouter/>
                <main>
                    <Switch>
                        <PrivateRoute path="/devis/:id" isAuthenticated={isAuthenticated} component={Quotation}/>
                        <PrivateRoute path="/devis" isAuthenticated={isAuthenticated} component={QuotationsPage}/>
                        <PrivateRoute path="/produits" isAuthenticated={isAuthenticated} component={Equipments}/>
                        <PrivateRoute path="/clients" isAuthenticated={isAuthenticated} component={Customers}/>
                        {/*<PrivateRoute path="/vendeurs" isAuthenticated={isAuthenticated} component={HomeSellers}/>*/}
                        <Route path="/techniciens" component={HomeTeck}/>
                        <Route path="/admin" component={HomeAdmin}/>
                        <Route path="/" component={LoginPage}/>

                    </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
    );
};

export default Routing;
