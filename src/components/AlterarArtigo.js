import React from "react";
import api from "../services/api"
import { withRouter } from "react-router-dom";

class AlterarArtigo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        idioma: '',
        numeroPaginas: undefined,
        ordem: undefined,
        palavrasChaveOriginal: '',
        palavrasChaveEn: undefined,
        resumoOriginal: '',
        resumoEn: '',
        tituloEn: '',
        tituloOriginal: '',
        volumeId: undefined,
        autores: [],
        loaded: false,
        autoresLoaded: false,
        id: undefined
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let id = parseInt(this.props.match.params.id);
        let volumeId = parseInt(this.props.match.params.volumeId);
        this.setState({id, volumeId}); 
        api
        .get("/artigo/" + id)
        .then((response) =>{
            console.log(response.data)
            this.preencheArtigo(response.data);
            this.setState({loaded: true});

            api
            .get("/artigo/" + id + "/autores")
            .then((response) => {
                this.setState({autores: response.data, autoresLoaded: true});
            }).catch((err)=>{
                console.log("ops! Ocorreu um erro " + err);
            })
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

        const idioma = this.state.idioma;
        const numeroPaginas = this.state.numeroPaginas;
        const ordem = this.state.ordem;
        const palavrasChaveEn = this.state.palavrasChaveEn;
        const palavrasChaveOriginal = this.state.palavrasChaveOriginal;
        const resumoOriginal = this.state.resumoOriginal;
        const resumoEn = this.state.resumoEn;
        const tituloOriginal = this.state.tituloOriginal;
        const tituloEn = this.state.tituloEn;
        const id = this.state.id
        const volumeId = this.state.volumeId;

        api
        .put('/artigo/alterar', {
            idioma,
            numeroPaginas,
            palavrasChaveEn,
            palavrasChaveOriginal,
            ordem,
            id,
            tituloOriginal,
            tituloEn,
            resumoEn,
            resumoOriginal,
            volumeId
        })
        .then((response)=>{
            console.log(response.data)
            this.preencheArtigo(response.data);
            this.setState({loaded: true});
        })
    }

    preencheArtigo(artigo) {
        console.log(artigo)
        this.setState({
            idioma: artigo.idioma,
            numeroPaginas: artigo.numeroPaginas,
            ordem: artigo.ordem,
            palavrasChaveEn: artigo.palavrasChaveEn,
            palavrasChaveOriginal: artigo.palavrasChaveOriginal,
            resumoOriginal: artigo.resumoOriginal,
            resumoEn: artigo.resumoEn,
            tituloEn: artigo.tituloEn,
            tituloOriginal: artigo.tituloOriginal,
            loaded: true
        });
    }

    removeAutor(id) {
      api
      .delete("/autor/remover/" + id)
      .then(()=>{
        api
        .get("/artigo/" + this.state.id + "/autores")
        .then((response) => {
            this.setState({autores: response.data, autoresLoaded: true});
        }).catch((err)=>{
            console.log("ops! Ocorreu um erro " + err);
        })
      })
    }

    render() {
      return (
        <>
        <h2>Editar Artigo</h2>
        <form onSubmit={this.handleSubmit}>
            <input type="hidden" value={this.state.id} />
          <label>
            Idioma:
            <input
              name="idioma"
              type="text"
              value={this.state.idioma}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            P??ginas:
            <input
              name="numeroPaginas"
              type="number"
              value={this.state.numeroPaginas}
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
          <label>
            Palavras Chave Ingl??s:
            <input
              name="palavrasChaveEn"
              type="text"
              value={this.state.palavrasChaveEn}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Palavras Chave:
            <input
              name="palavrasChaveOriginal"
              type="text"
              value={this.state.palavrasChaveOriginal}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Resumo em Ingl??s:
            <input
              name="resumoEn"
              type="text"
              value={this.state.resumoEn}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Resumo em Portugu??s:
            <input
              name="resumoOriginal"
              type="text"
              value={this.state.resumoOriginal}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            T??tulo em Ingl??s:
            <input
              name="tituloEn"
              type="text"
              value={this.state.tituloEn}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            T??tulo em Portugu??s:
            <input
              name="tituloOriginal"
              type="text"
              value={this.state.tituloOriginal}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="hidden" value={this.state.volumeId}/>
          <button type="submit">Salvar</button>
        </form>
        <h3>Autores</h3>
        <a href={'/autor/registrar/' + this.state.id + '/' + this.state.volumeId}>Adicionar autor</a>
        {this.state.autoresLoaded ? this.state.autores.map(autor => 
        <li key = {autor.id}>
            Nome: {autor.primeiroNome + ' ' + autor.meioNome + ' ' + autor.sobreNome} <br/>
            ORCID: {autor.orcid} <br/>
            <a href="#" onClick={() => this.removeAutor(autor.id)}>remover</a><br/>
            <a href={'/autor/alterar/' + autor.id + '/' + this.state.id}>alterar</a><br/>
        </li>) 
        : 'Carregando Autores...'}
        </>
      );
    }
}

export default withRouter(AlterarArtigo);

  