import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import "./Sellers.css"
import ActuSellers from "./ActuSellers";
import Quotation from "./Quotation";
import ReadQuotations from "./ReadQuotations";

const HomeSellers = () => {

    const [myState, setMyState] = useState('quotations')
    const goActu = () => {setMyState('actu')};
    const goCreateQuotations = () => {setMyState('createQuotations')};
    const goQuotations = () => {setMyState('quotations')};
    const goEducation = () => {setMyState('education')};
    const goSkills = () => {setMyState('skills')};
    const goInterets = () => {setMyState('interets')};
    const goAwards = () => {setMyState('awards')};
    const goJson = () => {setMyState('json')}

    return (

        <div className="container-fluid mt-3">
            <div className="row mt-4">
                <div className="aProp col-xl-2 col-lg-3 col-md-11 col-sm-12 col-xs-12">
                    <ul className="aul">
                        <li className="ali">
                            <Button variant="outlined" color="secondary"
                                    className={` ${myState === 'about' ? "buttonOnCv" : "buttonWidthCv"}`}
                                    onClick={goActu}> Actualités
                            </Button>
                        </li>
                        <li className="ali">
                            <Button variant="outlined" color="secondary"
                                    className={` ${myState === 'about' ? "buttonOnCv" : "buttonWidthCv"}`}
                                    onClick={goCreateQuotations}> Créer devis
                            </Button>
                        </li>
                        <li className="ali">
                            <Button variant="outlined" color="secondary"
                                    className={` ${myState === 'experience' ? "buttonOnCv" : "buttonWidthCv"}`}
                                    onClick={goQuotations}>
                                Consulter devis
                            </Button>
                        </li>
                        <li className="ali">
                            <Button variant="outlined" color="secondary"
                                    className={` ${myState === 'education' ? "buttonOnCv" : "buttonWidthCv"}`}
                                    onClick={goEducation}>
                                Créer facture
                            </Button>
                        </li>
                        <li className="ali">
                            <Button variant="outlined" color="secondary"
                                    className={` ${myState === 'skills' ? "buttonOnCv" : "buttonWidthCv"}`}
                                    onClick={goSkills}>
                                Consulter factures
                            </Button>
                        </li>
                        <li className="ali">
                            <Button variant="outlined" color="secondary"
                                    className={` ${myState === 'json' ? "buttonOnCv" : "buttonWidthCv"}`}
                                    onClick={goJson}>
                                Statistiques
                            </Button>
                        </li>
                    </ul>
                </div>
                <div className="col-xl-10 col-lg-9 col-md-12 col-sm-12 col-xs-12 padContent">
                    {myState === 'actu' ? <ActuSellers/> : <></>}
                    {myState === 'createQuotations' ? <Quotation/>: <></>}
                    {myState === 'quotations' ? <ReadQuotations/>: <></>}



                    {/*{myState === 'experience' ? <CvExperience/> : <></>}
                    {myState === 'education' ? <CvEducation/> : <></>}
                    {myState === 'skills' ? <CvSkills/> : <></>}*/}
                </div>
            </div>
        </div>
    );
};

export default HomeSellers;
