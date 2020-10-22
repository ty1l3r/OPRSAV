import React, {Fragment, useContext, useState} from 'react';
import AuthAPI from "../../Services/authAPI";
import authAPI from "../../Services/authAPI";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import './Accueil.css'
import AuthContext from "../../contexts/AuthContext";

const LoginPage = ({history}) => {
//utilisation du context
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
//SATE Error
    let [myError, setError] = useState("")
//STATE Inputs
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
//Gestion des champs
    const handleChange = ({currentTarget}, onLogin) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value})
    };
//Gestion du submit & de la redirection
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await AuthAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            let roleTab = authAPI.getRole();
            const realRole = roleTab[0];
            if (realRole === 'ROLE_ADMIN') {
                history.replace("/admin");
            }
            if (realRole === "ROLE_TECH") {
                history.replace("/techniciens");
            }
            if (realRole === "ROLE_VENDEUR") {
                history.replace("/vendeurs");
            }
        } catch (error) {
            setError(" \"Aucun compte ne possède cette adresse email ou alors " +
                "les informations ne correspondent pas !\"");
        }
    };
    return (
        <Fragment>
            <div className="container mt-2 text-center">
                <Fragment>
                    <h1>Connexion</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="row mt-5">
                            <div className="mt-4 col-12">
                                <TextField id="outlined username" htmlFor="username"
                                           name="username" value={credentials.username}
                                           label="Email" style={{margin: 8}}
                                           placeholder="Votre adresse email"
                                           className="loginInputs is-invalid"
                                           helperText="Utilisez votre adresse email @savpro.com"
                                           margin="normal" InputLabelProps={{shrink: true,}}
                                           variant="outlined" onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mt-5 col-12">
                                <TextField
                                    id="outlined-password-input" value={credentials.password}
                                    htmlFor="password" name="password"
                                    className="loginInputs" label="Password"
                                    type="password" autoComplete="current-password"
                                    placeholder="Votre mot de passe" variant="outlined"
                                    onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="mt-4 col-12">
                                <ButtonGroup size="large" aria-label="large outlined primary button group"
                                             className="loginButton">
                                    <Button type="submit">Connexion</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </form>
                </Fragment>
            </div>
        </Fragment>
    );
};

export default LoginPage;
