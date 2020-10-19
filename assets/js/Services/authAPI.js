import React from 'react';
import axios from "axios";
import jwtDecode from "jwt-decode";

/**
 * @param credentials
 * @returns {Promise<void>}
 */
function authenticate(credentials) {
    return axios
        .post("http://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            //Stockage du token
            window.localStorage.setItem("authToken", token);
            // On prévient Axios du nouveau Header sur nos requêtes HTTP
            setAxiosToken(token);
        });
}

/**
 * Déconnexion (suppression du token du localStorage et sur Axios)
 */
function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

/**
 * factorisation de la récupération du token.
 * @param token
 */
function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Récupération du role dans le token.
 * @returns {role}
 */
function getRole() {
    const getRoles = window.localStorage.getItem("authToken");
    const decode = jwtDecode(getRoles);
    return decode.roles;
}

/**
 * validation de la connexion.
 */
function setup() {
    //token ?
    const token = window.localStorage.getItem("authToken");
    //token encore valide ?
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
            console.log("connexion établie avec axios")
        }
    }
}

/**
 * Savoir si on est connecté ou pas
 * @returns {boolean}
 */
function isAuthenticated() {
    // 1. Voir si on a un token ?
    const token = window.localStorage.getItem("authToken");
    // 2. Si le token est encore valide
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        return expiration * 1000 > new Date().getTime();
    } return false;
}

export default {
    authenticate, logout, setup, isAuthenticated, getRole
}

