import axios from "axios";

/**
 * Récupère tous les utilisateurs.
 * @returns {Promise<*>}
 */
function findAll(){
    return axios
        .get("http://localhost:8000/api/customers")
        .then(response => response.data["hydra:member"])
}

/**
 * Récupère tous les utilisateurs.
 * @returns {Promise<*>}
 */
function findAllName(){
    return axios
        .get("http://localhost:8000/api/customers")
        .then(response => response.data["hydra:member"])
}

export default {
    findAll, findAllName
    /*delete: deleteCustomer*/
}