import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../services/api";

import { useHistory } from "react-router";

export default function Volume() {

    const [volume, setVolume] = useState();
    const [loaded, setLoaded] = useState(false);
    const [artigos, setArtigos] = useState();
    const [artigosLoaded, setArtigosLoaded] = useState(false);
    let { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        api
        .get("/volume/" + id)
        .then((response) =>{
            setVolume(response.data);
            setLoaded(true);

            api
            .get("/volume/" + id + "/artigos/listar")
            .then((response) => {
                setArtigos(response.data);
                setArtigosLoaded(true);
            }).catch((err)=>{
                console.log("ops! Ocorreu um erro " + err);
            })
        })
        .catch((err) => {
            console.log("ops! Ocorreu um erro " + err);
        });

    }, []);

    return (
        <>
            <h2>{ 'Volume ' + id } </h2>
            { loaded ? 
            <div>
                Cidade: {volume.cidade} <br/>
                data: {volume.dataInicio} <br/>
                descricao: {volume.descricaoPt} <br/>
                edicao: {volume.edicao} <br/>
                sigla: {volume.sigla} <br/>
                <a href={'/volume/alterar/' + volume.id}>Editar</a>
            </div> 
            : 'Carregando...'}
            <h3>Artigos</h3>
            <a href={'/artigo/registrar/' + id}>Adicionar artigo</a>
            {artigosLoaded ? artigos.map(artigo => 
            <li>
                Título: {artigo.tituloOriginal} <br/>
                Resumo: {artigo.resumoOriginal} <br/>
                <a href={'/artigo/' + artigo.id + "/" + id}>detalhar</a><br/>
            </li>) 
            : 'Carregando Artigos...'}
            <br/>
            <a href="#" onClick={() => history.goBack()}>Voltar</a>
        </>
        );


}