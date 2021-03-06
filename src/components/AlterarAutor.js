import React from "react";
import api from "../services/api"
import { withRouter } from "react-router-dom";

class AlterarAutor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        primeiroNome: '',
        meioNome: '',
        sobreNome: '',
        afiliacao: '',
        afiliacaoEn: '',
        email: '',
        orcid: '',
        ordem: undefined,
        pais: '',
        id: undefined,
        artigoId: undefined,
        ordem: undefined
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let id = parseInt(this.props.match.params.id);
        let artigoId = parseInt(this.props.match.params.artigoId);
        this.setState({id, artigoId}); 
        api
        .get("/autor/" + id)
        .then((response) =>{
            console.log(response.data)
            this.preencheAutor(response.data);
            this.setState({loaded: true});
        })
        .catch((err) => {
            console.log("ops! Ocorreu um erro " + err);
        });
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

        const primeiroNome = this.state.primeiroNome;
        const meioNome = this.state.meioNome;
        const sobreNome = this.state.sobreNome;
        const afiliacao = this.state.afiliacao;
        const afiliacaoEn = this.state.afiliacaoEn;
        const email = this.state.email;
        const orcid = this.state.orcid;
        const pais = this.state.pais;
        const id = this.state.id;
        const ordem = this.state.ordem;
        const artigoId = this.state.artigoId;

        api
        .put('/autor/alterar', {
            primeiroNome,
            meioNome,
            sobreNome,
            afiliacao,
            afiliacaoEn,
            email,
            orcid,
            pais,
            id,
            ordem,
            artigoId
        })
        .then((response)=>{
            console.log(response.data)
            this.preencheAutor(response.data);
            this.setState({loaded: true});
        })
    }

    preencheAutor(autor) {
        console.log(autor)
        this.setState({
            primeiroNome: autor.primeiroNome,
            meioNome: autor.meioNome,
            sobreNome: autor.sobreNome,
            afiliacao: autor.afiliacao,
            afiliacaoEn: autor.afiliacaoEn,
            email: autor.email,
            ordem: autor.ordem,
            orcid: autor.orcid,
            pais: autor.pais,
            ordem: autor.ordem,
            id: autor.id
        });
    }


    render() {
      return (
        <>
        <h2>Editar Autor</h2>
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
            Afilica????o:
            <input
              name="afiliacao"
              type="text"
              value={this.state.afiliacao}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Afilica????o em Ingl??s:
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
            Pa??s:
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
        </>
      );
    }
}

export default withRouter(AlterarAutor);
