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
        email: '',
        orcid: '',
        pais: '',
        id: 0,
        ordem: 0
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let id = parseInt(this.props.match.params.id);
        this.setState({id}); 
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
        const email = this.state.email;
        const orcid = this.state.orcid;
        const pais = this.state.pais;
        const id = this.state.id

        api
        .put('/autor/alterar', {
            primeiroNome,
            meioNome,
            sobreNome,
            afiliacao,
            email,
            orcid,
            pais,
            id
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
            email: autor.email,
            orcid: autor.orcid,
            pais: autor.pais,
            ordem: autor.ordem,
            id: autor.id
        });
    }


    render() {
      return (
        <>
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
              type="text"
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
