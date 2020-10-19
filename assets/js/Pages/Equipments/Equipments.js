import React, {Fragment, useEffect, useState} from 'react'
import Pagination from "../../components/Paginations/Pagination"
import EquipmentsAPI from "../../Services/EquipmentsAPI"
import './Equipments.css'

function Equipments() {

    /* STATE pour modifier la variable et afficher le composant */
    const [equipments, setEquipments] = useState([]);
    /* STATE pagination */
    const [currentPage, setCurrentPage] = useState(1);
    /* STATE Search Box */
    const [search, setSearch] = useState("");
    /*STATE image*/
    const [zoom, setZoom] = useState(false);
    //SetSTATE du Zoom
    const setZoomOn = () => {
        setZoom(true)
    }
    const setZoomOff = () => {
        setZoom(false)
    }

    // Permet d'aller récupérer les customers
    const fetchEquipments = async () => {
        try {
            const data = await EquipmentsAPI.findAll()
            setEquipments(data);
        } catch (error) {
            console.log(error.response);
        }
    }
    // Au chargement on va chercher les composants.
    useEffect(() => {
        fetchEquipments().then(r => []);
    }, []);
    // Gestion du changement de page
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
    const filteredEquipments = equipments.filter(
        e =>
            e.name.toString().includes(search.toLowerCase()) ||
            e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.ref.toLowerCase().includes(search.toLowerCase()) ||
            e.price.toString().includes(search.toLowerCase())
    );
    /* Pagination des données */
    const itemsPerPage = 5;
    const paginateEquipments = Pagination.getData(filteredEquipments, currentPage, itemsPerPage)

    return (
        <Fragment>
            <div className="container">
                <div className="card border-primary mb-3 cardAdjust">
                    <div className="card-header cardPersoTitle">Liste de nos produits</div>
                    <div className="form-group">
                        <input type="text" onChange={handleSearch} value={search} className="form-control"
                               placeholder="rechercher"/>
                    </div>
                    <table className="table table-hover tableBackground">
                        <thead>
                        <tr>
                            <th>Photo</th>
                            <th className="text-center">identifiant</th>
                            <th>référence</th>
                            <th>Désignation</th>

                            <th className="text-center">Stock</th>
                            <th className="text-center">Prix</th>
                            <th className="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginateEquipments.map(equipment =>
                            <tr key={equipment.id} className="justify-content-center">
                                <td className="picture">
                                    <img src={equipment.picture}
                                         alt="pictureSAVPRO"
                                         onMouseOver={setZoomOn}
                                         onMouseLeave={setZoomOff}
                                         className={` ${zoom === true ? "imgZoom" : "imgNonZoom"}`}
                                    />
                                    {/*<ZoomInIcon className="zoomImg"/>*/}
                                </td>
                                <td className="text-center">
                                    <span className="badge badge-light">
                                        {equipment.id}
                                    </span>
                                </td>
                                <td>{equipment.ref} </td>
                                <td>{equipment.name} </td>

                                <td className="text-center"> {equipment.stock} </td>
                                <td className="text-center"> {equipment.price} </td>
                                <td className="text-center">
                                    <button className="btn btn-sm btn-primary disabled">Détail</button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                {/*Si il y a moins de 10 user pas d'affichage de page */}
                {itemsPerPage < filteredEquipments.length && (
                    <Pagination currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                length={filteredEquipments.length}
                                onPageChanged={handlePageChange}/>)
                }
            </div>
        </Fragment>
    );
}
export default Equipments;