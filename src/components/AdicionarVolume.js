import React from "react";
import api from "../services/api"
import { Redirect } from "react-router-dom";

class AdicionarVolume extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cidade: '',
        dataInicio: '',
        descricaoPt: '',
        edicao: undefined,
        sigla: '',
        id: undefined,
        redirect: false
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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

        const cidade = this.state.cidade;
        const dataInicio = this.state.dataInicio;
        const descricaoPt = this.state.descricaoPt;
        const descricaoEn = this.state.descricaoEn;
        const edicao = this.state.edicao;
        const sigla = this.state.sigla;
        const id = this.state.id

        api
        .post('/volume/registrar', {
            cidade ,
            dataInicio,
            descricaoEn,
            descricaoPt,
            edicao,
            sigla, 
            id
        })
        .then(()=>{
            this.setState({redirect: true});
        })
    }


    render() {
      return (
        <>
        <h2>Adicionar Volume</h2>
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
            Descrição:
            <input
              name="descricaoPt"
              type="text"
              value={this.state.descricaoPt}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Descrição Inglês:
            <input
              name="descricaoEn"
              type="text"
              value={this.state.descricaoEn}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Edição:
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
          <button type="submit">Adicionar</button>
        </form>
        {this.state.redirect ? <Redirect to="/home" /> : ''}
        </>
      );
    }
}

export default AdicionarVolume;

  