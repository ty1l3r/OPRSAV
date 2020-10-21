import axios from "axios";

/**
 * Récupère tous les devis.
 * @returns {Promise<*>}
 */
function findAll(){
    return axios
        .get("http://localhost:8000/api/quotations")
        .then(response => response.data["hydra:member"])
}

function deleteQuotations (id) {
    return axios
        .delete('http://localhost:8000/api/quotations/' + id)
        .then(response => console.log("Devis supprimé"))

}

/*
function postQuotations (newQuotation){
    return axios.post("http://localhost:8000/api/quotations", newQuotation)
        .then(response => console.log("nouvelle facture posté"));
}
*/

export default {
    findAll,
    delete: deleteQuotations,
}