import React, {Fragment, useEffect, useState} from 'react';
import QuotationsAPI from "../../../Services/QuotationsAPI";
import moment from "moment";
import Pagination from "../../../components/Paginations/Pagination";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import MenuSellers from "../../../components/MenusSellers/MenuSellers";


function ReadQuotations() {

    /* STATE pagination */
    const [currentPage, setCurrentPage] = useState(1);
    /* STATE pour modifier la variable et afficher le composant */
    const [quotations, setQuotations] = useState([]);
    /* STATE Search Box */
    const [searchQuotations, setSearchQuotations] = useState("");

    //formatage de la date
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    //couleurs des status
    const STATUS_CLASSES = {PAID : "success", WAIT:"info", CANCELLED:"danger"}
    const STATUS_LABELS = {PAID: "Validé", WAIT: 'En attente', CANCELLED: 'Annulée'
    }
    // Permet d'aller récupérer les quotations
    const fetchQuotations = async () => {
        try {const data = await QuotationsAPI.findAll()
            setQuotations(data);
        } catch (error) {
        }
    }
    // Au chargement on va chercher les composants.
    useEffect(() => {fetchQuotations().then(r =>[] );}, []);

    // Gestion du changement de page
    const handlePageChange = page => {
        setCurrentPage(page);
    };
    //Fonction du Search
    const handleSearch = ({currentTarget}) => {
        const value = currentTarget.value;
        setSearchQuotations(value);
        setCurrentPage(1);
    }
    //Filtrage de la recherche
    const filteredEquipments = quotations.filter(
        q =>
           /* q.client.name.toLowerCase().includes(searchQuotations.toLowerCase()) ||*/
            STATUS_LABELS[q.status].toLowerCase().includes(searchQuotations.toLowerCase()) ||
            q.amount.toString().includes(searchQuotations.toLowerCase())
    );
    /* Pagination des données */
    const itemsPerPage = 10;
    const paginateQuotations = Pagination.getData(filteredEquipments, currentPage, itemsPerPage)
    //Fonction Delete
    const handleDelete = (id) => {
        /*console.log(id);*/
        const originalQuotations = [...quotations];
        setQuotations(quotations.filter(quotation => quotation.id !== id));
        QuotationsAPI.delete(id)
            .catch(error => {
                setQuotations(originalQuotations);
                /*console.log(error.response);*/
            });
    };

    return (
        <Fragment>
            <MenuSellers/>

            <div className="container-fluid">
                <FormControl component="fieldset">
                    <FormLabel className="radioB" component="legend">Recherches rapides</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel value="" onChange={handleSearch} checked={setSearchQuotations.value}
                                          control={<Radio color="primary"/>} label="Tous" labelPlacement="end"
                        />
                        <FormControlLabel
                            value="Validé" onChange={handleSearch} checked={setSearchQuotations.value}
                            control={<Radio color="primary"/>} label="Validés" labelPlacement="end"
                        />
                        <FormControlLabel
                            value="En attente" onChange={handleSearch} checked={setSearchQuotations.value}
                            control={<Radio color="primary"/>} label="En Attente" labelPlacement="end"
                        />
                        <FormControlLabel
                            value="Annulée" onChange={handleSearch} checked={setSearchQuotations.value}
                            control={<Radio color="primary"/>} label="Annulée" labelPlacement="end"
                        />
                    </RadioGroup>
                </FormControl>

                <div className="card border-primary mb-3 cardAdjust">
                    <div className="card-header cardPersoTitle">Mes devis</div>
                    <div className="form-group">
                        <input type="text" onChange={handleSearch} value={searchQuotations} className="form-control"
                               placeholder="rechercher"
                        />

                    </div>
                    <table className="table table-hover tableBackground">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th className="text-center">N°Devis</th>
                            <th>Client</th>
                            <th>Montant</th>
                            <th className="text-center">Statut</th>
                            <th className="text-center">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {paginateQuotations.map(quotation =>
                            <tr key={quotation.sentAt} className="justify-content-center">
                                <td className="text-center"> {formatDate(quotation.sentAt)}</td>
                                <td className="text-center"> {quotation.chrono} </td>
                                <td> {quotation.client.name}</td>
                                <td>  {quotation.amount} €</td>
                                <td className="text-center">
                            <span className={"badge badge-" + STATUS_CLASSES[quotation.status]}>
                                {STATUS_LABELS[quotation.status]}
                            </span>

                                </td>
                                <td className="text-center">
                                    { quotation.status === "PAID" ? <> </>
                                        :
                                        <button className="btn btn-sm btn-primary danger"
                                                onClick={ () => handleDelete(quotation.id)}
                                        >Supprimer</button>
                                    }

                                </td>
                            </tr>
                        )}
                        </tbody>

                    </table>

                    <Pagination currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                length={filteredEquipments.length}
                                onPageChanged={handlePageChange}/>


                </div>


            </div>
        </Fragment>
    );
}

export default ReadQuotations;