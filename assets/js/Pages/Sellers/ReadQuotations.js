import React, {Fragment} from 'react';

function ReadQuotations(props) {
    return (
        <Fragment>
            <div className="card border-primary mb-3 cardAdjust">
                <div className="card-header cardPersoTitle">Liste des devis</div>
                <table className="table table-hover tableBackground">
                    <thead>
                        <th>Date</th>
                        <th>Devis n°</th>
                        <th>Clients</th>
                        <th>Montant</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>11/10/2020</td>
                        <td>1</td>
                        <td>Darty</td>
                        <td>10 000 E</td>
                        <td>En cours</td>
                        <td> <button className="btn btn-sm btn-danger">Supprimer</button></td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}
export default ReadQuotations;