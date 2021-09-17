import React from "react";
import api from "../services/api"
import { withRouter, Redirect } from "react-router-dom";

class AdicionarAutor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        primeiroNome: '',
        meioNome: '',
        sobreNome: '',
        afiliacao: '',
        email: '',
        orcid: '',
        pais: '',
        id: undefined,
        ordem: undefined,
        artigoId: undefined,
        redirect: false,
        volumeId: undefined
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let artigoId = parseInt(this.props.match.params.artigoId);
        let volumeId = parseInt(this.props.match.params.volumeId);
        this.setState({artigoId, volumeId}); 
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    redirectToArtigoDono() {
        return <Redirect to={'/artigo/' + this.state.artigoId + '/' + this.state.volumeId} />
    }
  
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ loaded: false })

        const primeiroNome = this.state.primeiroNome;
        const meioNome = this.state.meioNome;
        const sobreNome = this.state.sobreNome;
        const afiliacaoEn = this.state.afiliacaoEn;
        const afiliacao = this.state.afiliacao;
        const email = this.state.email;
        const orcid = this.state.orcid;
        const pais = this.state.pais;
        const ordem = this.state.ordem
        const id = this.state.id;
        const artigoId = this.state.artigoId;
        
        api
        .post('/autor/registrar', {
            primeiroNome,
            meioNome,
            sobreNome,
            afiliacao,
            email,
            orcid,
            pais,
            id,
            artigoId,
            afiliacaoEn,
            ordem
        })
        .then(()=>{
            this.setState({redirect: true})
        })
    }

    render() {
      return (
        <>
        <h2>Adicionar Autor</h2>
        <form onSubmit={this.handleSubmit}>
            <input type="hidden" value={this.state.id} />
          <label>
            Primeiro Nome:
            <input
              name="primeiroNome"
              type="text"
              value={this.state.primeiroNome}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Nome do meio:
            <input
              name="meioNome"
              type="text"
              value={this.state.meioNome}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Sobrenome:
            <input
              name="sobreNome"
              type="text"
              value={this.state.sobreNome}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Afilicação:
            <input
              name="afiliacao"
              type="text"
              value={this.state.afiliacao}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Afilicação em Inglês:
            <input
              name="afiliacaoEn"
              type="text"
              value={this.state.afiliacaoEn}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            E-mail:
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            País:
            <input
              name="pais"
              type="text"
              value={this.state.pais}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            ORCID:
            <input
              name="orcid"
              type="text"
              value={this.state.orcid}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Ordem:
            <input
              name="ordem"
              type="number"
              value={this.state.ordem}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <button type="submit">Salvar</button>
        </form>
        {this.state.redirect ? this.redirectToArtigoDono() : ''}
        </>
      );
    }
}

export default withRouter(AdicionarAutor);
