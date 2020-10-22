import React, {Fragment} from 'react';

function HomeAdmin() {
    return (
        <Fragment>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3 className="mt-3">Test SAVPRO</h3>
                        <h3> tâches réalisé </h3><br/>
                        <ul>
                            <li> API REST SYMFONY 4</li>
                            <li> Front-End React 16</li>
                            <li> Endpoint d'authentification sur JWT</li>
                            <li> Formulaire de connexion s’appuyant sur l’authentification de l’API.</li>
                            <li> Page avec recherche listant les saisies</li>
                            <li> Structure de la base de données</li>
                            <li> Formulaire permettant l'ajout / suppression des saisies.</li>
                            <li> Création des fakers</li>
                            <li> Endpoint de saisie pour la création d'un devis</li>
                        </ul>
                        <hr/>
                        <h3> Démarche </h3>
                        <ul>
                            <li> Réflexion sur la structure de la base de données</li>
                            <li> Installation de symfony4 & création des entités</li>
                            <li> Codage des dataFixtures</li>
                            <li> Installation et configuration d'API Platform avec Postman</li>
                            <li> Sécurisation et cloisonnement des accès via "security.yaml"</li>
                            <li> Création des premières Queries avec Doctrine pour l'ajout d'un devis</li>
                            <li> Création des Events</li>
                            <li> Installation et configuration de React pour Symfony</li>
                            <li> installation des styles "ui-material" + Bootstrap / jquery</li>
                            <li> Création des pages React et codage de l'insertion des données</li>
                        </ul>
                        <hr/>
                    </div>
                </div>
            </div>


        </Fragment>
    );
}

export default HomeAdmin;