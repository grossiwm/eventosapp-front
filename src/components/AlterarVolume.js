import React from "react";
import api from "../services/api"
import { withRouter } from "react-router-dom";

class AlterarVolume extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cidade: '',
        dataInicio: '',
        descricaoPt: '',
        edicao: undefined,
        sigla: '',
        id: undefined,
        artigos: [],
        loaded: false,
        artigosLoaded:false
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let id = parseInt(this.props.match.params.id);
        this.setState({id}); 
        api
        .get("/volume/" + id)
        .then((response) =>{
            this.preencheVolume(response.data);
            this.setState({loaded: true});

            api
            .get("/volume/" + id + "/artigos/listar")
            .then((response) => {
                this.setState({artigos: response.data, artigosLoaded: true});
            }).catch((err)=>{
                console.log("ops! Ocorreu um erro " + err);
            })
        })
        .catch((err) => {
            console.log("ops! Ocorreu um erro " + err);
        });
    }

    removeArtigo(id) {
      api
      .delete("/artigo/remover/" + id)
      .then(()=>{
        api
        .get("/volume/" + this.state.id + "/artigos/listar")
        .then((response) => {
            this.setState({artigos: response.data, artigosLoaded: true});
        }).catch((err)=>{
            console.log("ops! Ocorreu um erro " + err);
        })
      })
      
  }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ loaded: false })

        const cidade = this.state.cidade;
        const dataInicio = this.state.dataInicio;
        const descricaoPt = this.state.descricaoPt;
        const descricaoEn = this.state.descricaoEn;
        const edicao = this.state.edicao;
        const sigla = this.state.sigla;
        const id = this.state.id

        api
        .put('/volume/alterar', {
            cidade ,
            dataInicio,
            descricaoEn,
            descricaoPt,
            edicao,
            sigla, 
            id
        })
        .then((response)=>{
            this.preencheVolume(response.data);
            this.setState({loaded: true});
        })
    }

    preencheVolume(volume) {
        this.setState({
            cidade: volume.cidade,
            dataInicio: volume.dataInicio,
            descricaoPt: volume.descricaoPt,
            descricaoEn: volume.descricaoEn,
            edicao: volume.edicao,
            sigla: volume.sigla,
            loaded: true
        });
    }


    render() {
      return (
        <>
        <h2>Editar Volume</h2>
        <form onSubmit={this.handleSubmit}>
            <input type="hidden" value={this.state.id} />
          <label>
            Cidade:
            <input
              name="cidade"
              type="text"
              value={this.state.cidade}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Data:
            <input
              name="dataInicio"
              type="text"
              value={this.state.dataInicio}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Descri????o:
            <input
              name="descricaoPt"
              type="text"
              value={this.state.descricaoPt}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Descri????o Ingl??s:
            <input
              name="descricaoEn"
              type="text"
              value={this.state.descricaoEn}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Edi????o:
            <input
              name="edicao"
              type="number"
              value={this.state.edicao}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Sigla:
            <input
              name="sigla"
              type="text"
              value={this.state.sigla}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <button type="submit">Salvar</button>
        </form>

        <h3>Artigos</h3>
        <a href={'/artigo/registrar/' + this.state.id}>Adicionar artigo</a>
        {this.state.artigosLoaded ? this.state.artigos.map(artigo => 
        <li key = {artigo.id}>
            T??tulo: {artigo.tituloOriginal} <br/>
            Resumo: {artigo.resumoOriginal} <br/>
            <a href="#" onClick={() => this.removeArtigo(artigo.id)}>remover</a><br/>
            <a href={'/artigo/alterar/' + artigo.id + '/' + this.state.id}>alterar</a><br/>
        </li>) 
        : 'Carregando Artigos...'}
        </>
      );
    }
}

export default withRouter(AlterarVolume);

  