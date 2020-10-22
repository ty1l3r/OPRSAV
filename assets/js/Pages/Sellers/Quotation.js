import React, {Fragment, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CustomersAPI from "../../Services/CustomersAPI";
import Field from "../../components/Form/Field";
import axios from 'axios'
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {'& > *': {margin: theme.spacing(1), width: '40ch',},},
    formControl: {margin: theme.spacing(1), minWidth: 300,},
    selectEmpty: {marginTop: theme.spacing(2),},
}));

function Quotation(props) {

    //savoir si c'est une création
    const {id = 'new'} = props.match.params;

    const classes = useStyles();
    const [customers, setCustomers] = useState([]);
    const [catchId, setCatchId] = useState();
    const [amount, setAmount] = useState();
    const [editing, setEditing] = useState(false);

    const [newQuotation, setNewQuotation] = useState({
        "amount": '',
        "clientId": ''
    })
    /*
        const [errors, setErros] = useState({
            amount:"Le montant doit être écris en chiffre"
        })*/

    const fetchQuotation = async id => {
        try {
            const data = await axios
                .get("http://localhost:8000/api/quotations/" + id)
                .then(response => response.data);
            console.log(data);
            const {amount} = data;
            setAmount(amount);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchQuotation(id)
        }
    }, [id]);

    const setSendData = () => {
        setNewQuotation({amount: parseFloat(amount), clientId: parseFloat(catchId)});
        console.log(newQuotation);
    }
    //envoyer les donnée du forme dans un tableau pour le submit
    const handleSubmit = async event => {

        console.log(newQuotation);
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/quotations", newQuotation)
            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    //récupère le montant et l'id du formulaire.
    const handleSelectId = (event) => {
        setCatchId(event.target.value);
    };
    const handleSelectAmount = (event) => {
        setAmount(event.target.value);
    };

    // Permet d'aller récupérer les quotations
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data);
        } catch (error) {
        }
    }
    // Au chargement on va chercher les composants.
    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <Fragment>
            <div className="container mt-5">

                {(!editing && <h2 className="text-center">Créer un devis</h2>) || (
                    <h2 className="text-center">Modifier un devis</h2>
                )}
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="row">
                            <div className="col border text-center mb-2">
                                <Link to="/devis">Retour aux devis</Link>
                            </div>
                        </div>
                        <form className={classes.root} onSubmit={handleSubmit} onClick={setSendData}>
                            <div className="card border-primary mb-3 fullDiv">
                                <div className="card-title cardTitle">
                                    <p className="p-2">Entrez le montant de votre devis</p>
                                </div>
                                <div className="card-body cardPersoContent">
                                    <Field
                                        name="amount"
                                        placeholder="Entrez le montant de la facture"
                                        onChange={handleSelectAmount}
                                        /*error={errors.amount}*/
                                    >
                                    </Field>
                                </div>
                            </div>
                            <div className="card border-primary mb-3 fullDiv">
                                <div className="card-title cardTitle">
                                    <p className="p-2">Selectionnez votre client</p>
                                </div>
                                <div className="card-body cardPersoContent">
                                    <div className="form-group">
                                        <select className="custom-select" onChange={handleSelectId}>
                                            <option value=""></option>
                                            {customers.map(customer =>
                                                <option key={customer.iban}
                                                        value={customer.id}
                                                        onSelect={setCatchId}
                                                >{customer.name}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success">Envoyer</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Quotation;