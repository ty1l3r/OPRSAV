import axios from "axios";

function findAll(){
    return axios
        .get("http://localhost:8000/api/equipments")
        .then(response => response.data["hydra:member"])
}

/*function deleteEquipments (id) {
    return axios
        .delete('http://localhost:8000/api/equipments/' + id)
}*/
export default {
    findAll,
   /* delete: deleteCustomer*/
}