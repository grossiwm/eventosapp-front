import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {

    const [volumes, setVolumes] = useState();
    const [loaded, setLoaded] = useState(false);

    const removeVolume = (id) =>  {
        api
        .delete("/volume/remover/" + id)
        .then((response)=>{
            setVolumes = volumes.filter((volume)=>volume.id !== id);
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
            <h2>Home</h2>
            <a href="/volume/registrar">Adicionar Novo Volume</a>
            { loaded ? volumes.map(volume => 
            <li key={volume.id}>
                id: {volume.id} |
                cidade: {volume.cidade} | 
                edição: {volume.edicao} | 
                sigla: {volume.sigla} | 
                data: {volume.dataInicio} | <a href={'/volume/' + volume.id}>ver</a> | <a href="#" onClick={() => removeVolume(volume.id)}>remover</a>
            </li>) 
            : 'Carregando...'}
        </>
        );


}