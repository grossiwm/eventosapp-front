import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../services/api";
import { useHistory } from "react-router";

export default function Autor() {

    const [autor, setAutor] = useState();
    const [loaded, setLoaded] = useState(false);
    let { id } = useParams();
    let {artigoId} = useParams();
    let history = useHistory();

    useEffect(() => {
        api
        .get("/autor/" + id)
        .then((response) =>{
            setAutor(response.data);
            setLoaded(true);
        })
        .catch((err) => {
            console.log("ops! Ocorreu um erro " + err)
        });
    }, []);

    return (
        <>
            <h2>{ 'Autor ' + id } </h2>
            { loaded ? 
            <div>
                Nome: {autor.primeiroNome + ' ' + autor.meioNome + ' ' + autor.sobreNome} <br/>
                Afilicação: {autor.afiliacao} <br/>
                E-mail: {autor.email} <br/>
                ORCID: {autor.orcid} <br/>
                País: {autor.pais} <br/>
                <a href={'/autor/alterar/' + autor.id + '/' + artigoId}>editar</a><br/>
                <a href="#" onClick={() => history.goBack()}>Voltar</a>
            </div> 
            : 'Carregando...'}
        </>
        );


}