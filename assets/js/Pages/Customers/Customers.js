import React, {Fragment, useEffect, useState} from 'react'
import Pagination from "../../components/Paginations/Pagination";
import CustomersAPI from "../../Services/CustomersAPI";

function Customers(props) {

    /* STATE pour modifier la variable et afficher le composant */
    const [customers, setCustomers] = useState([]);
    /* STATE pagination */
    const [currentPage, setCurrentPage] = useState(1);
    /* STATE Search Box */
    const [search, setSearch] = useState("");

    // Permet d'aller récupérer les customers
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data);
        } catch (error) {
            console.log(error.response);
        }
    }
    // Au chargement on va chercher les composants.
    useEffect(() => {
        fetchCustomers().then(r => []);
    }, []);
    //Gestion du changement de page
    const handlePageChange = page => {
        setCurrentPage(page);
    };
    //Fonction du Search
    const handleSearch = ({currentTarget}) => {
        const value = currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    }
    //Filtrage de la recherche
    const filteredCustomers = customers.filter(
        c =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            c.address.toLowerCase().includes(search.toLowerCase())
    );
    /*Appel de cu composant pagination*/
    const itemsPerPage = 5;
    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage)

    return (
        <Fragment>
            <div className="card border-primary mb-3 cardAdjust">
                <div className="card-header cardPersoTitle">Liste des devis</div>
                <div className="form-group">
                    <input type="text" onChange={handleSearch} value={search} className="form-control"
                           placeholder="rechercher"/>
                </div>
                <table className="table table-hover tableBackground">
                    <thead>
                    <tr>
                        <th className="text-center">identifiant</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Adresse</th>
                        <th className="text-center">Chiffre d'affaire</th>
                        <th className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedCustomers.map(customer => (
                        <tr key={customer.id}>
                            <td className="text-center">
                                <span className="badge badge-light">
                                    {customer.id}
                                </span>
                            </td>
                            <td> {customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.address}</td>
                            <td className="text-center">{customer.ca.toLocaleString()} €</td>
                            <td className="text-center">
                                <button className="btn btn-sm btn-danger">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {/*Si il y a moins de 10 user pas d'affichage de page */}
            {itemsPerPage < filteredCustomers.length && (
                <Pagination currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            length={filteredCustomers.length}
                            onPageChanged={handlePageChange}/>)
            }
        </Fragment>
    );
}

export default Customers;
