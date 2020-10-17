import React, {Fragment, useState} from 'react';
import Pagination from "../../components/Paginations/Pagination";

function Equipments(props) {

    const [loading, setLoading] = useState (false);


    return (
        <Fragment>
            <div className="container-fluid">
                <div className="card border-primary mb-3 cardAdjust">
                    <div className="card-header cardPersoTitle">Liste de nos produits</div>
                    <table className="table table-hover tableBackground">
                        <thead>
                        <tr>
                            <th className="text-center">identifiant</th>
                            <th>référence</th>
                            <th>Désignation</th>
                            <th>Photo</th>
                            <th className="text-center">Stock</th>
                            <th className="text-center">Prix</th>
                            <th className="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        {loading === true ?
                            <Fragment>
                                <td>
                                    <tr className="text-center ">
                                        Chargement...
                                    </tr>
                                </td>
                            </Fragment>
                            :
                            <Fragment>
                               {/* {customers.map(customer => (*/}
                                    <tr>
                                    <td className="text-center">
                                <span className="badge badge-light">

                                </span>
                                        </td>
                                        <td> </td>
                                        <td></td>
                                        <td></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center">
                                            <button className="btn btn-sm btn-danger">Supprimer</button>
                                        </td>
                                    </tr>
                              {/*  ))}*/}

                            </Fragment>}

                        </tbody>
                    </table>
                </div>
              {/*  <Pagination currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            length={totalItems}
                            onPageChanged={handlePageChange}/>*/}
            </div>
        </Fragment>
    );
}

export default Equipments;