import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../services/api";

export default function Artigo() {

    const [artigo, setArtigo] = useState();
    const [autores, setAutores] = useState();
    const [loaded, setLoaded] = useState(false);
    const [autoresLoaded, setAutoresLoaded] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        api
        .get("/artigo/" + id)
        .then((response) =>{
            setArtigo(response.data);
            setLoaded(true);

            api
            .get("/artigo/" + id + "/autores")
            .then((response) => {
                setAutores(response.data);
                setAutoresLoaded(true);
            }).catch((err)=>{
                console.log("ops! Ocorreu um erro " + err);
            })
        })
        .catch((err) => {
            console.log("ops! Ocorreu um erro " + err)
        });
    }, []);

    return (
        <>
            <h2>{ 'Artigo ' + id } </h2>
            { loaded ? 
            <div>
                Idioma: {artigo.idioma} <br/>
                páginas: {artigo.numeroPaginas} <br/>
                ordem: {artigo.ordem} <br/>
                palavras chave: {artigo.palavrasChaveOriginal} <br/>
                resumo: {artigo.resumoOriginal} <br/>
                título: {artigo.tituloOriginal} <br/>
                <a href={'/artigo/alterar/' + artigo.id}></a>
            </div> 
            : 'Carregando...'}
            <h3>Autores</h3>
            {autoresLoaded ? autores.map(autor => 
            <li>
                Nome: {autor.primeiroNome + ' ' + autor.meioNome + ' ' + autor.sobreNome} <br/>
                Afilicação: {autor.afiliacao} <br/>
                E-mail: {autor.email} <br/>
                ORCID: {autor.orcid} <br/>
                País: {autor.pais} <br/>
                <a href={'/autor/' + autor.id}>detalhar</a>
            </li>) 
            : 'Carregando Autores...'}
        </>
        );


}