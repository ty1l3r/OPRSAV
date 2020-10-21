import React, {Fragment} from 'react';
import './MenuSellers.css'
import {Link} from "react-router-dom";

function MenuSellers(props) {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#"><span className="menuColor"> VENDEURS </span></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                        aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"> </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Devis <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Factures</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/devis/new">
                                Créer devis
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Créer factures</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Statistiques</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
}

export default MenuSellers;