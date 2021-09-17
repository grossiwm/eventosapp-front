import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {

    const [volumes, setVolumes] = useState();
    const [loaded, setLoaded] = useState(false);

    const removeVolume = (id) =>  {
        api
        .delete("/volume/remover/" + id)
        .then(()=>{
            api
            .get("/volume/listar")
            .then((response) =>{
                setVolumes(response.data);
                setLoaded(true);
            })
            .catch((err) => {
                console.log("ops! Ocorreu um erro " + err)
            });
        })
        
    }

    useEffect(() => {
        api
        .get("/volume/listar")
        .then((response) =>{
            setVolumes(response.data);
            setLoaded(true);
        })
        .catch((err) => {
            console.log("ops! Ocorreu um erro " + err)
        });
    }, []);

    return (
        <>
            <h2>Volumes</h2>
            <a href="/volume/registrar">Adicionar Novo Volume</a><br/>
            { loaded ? volumes.map(volume => 
            <li key={volume.id}>
                Descrição: {volume.descricaoPt} | 
                Cidade: {volume.cidade} | 
                Edição: {volume.edicao} | 
                Sigla: {volume.sigla} | 
                Data: {volume.dataInicio} | <a href={'/volume/' + volume.id}>ver</a> | <a href="#" onClick={() => removeVolume(volume.id)}>remover</a>
            </li>) 
            : 'Carregando...'}
        </>
        );


}