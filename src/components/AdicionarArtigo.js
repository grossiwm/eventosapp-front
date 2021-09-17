import React from "react";
import api from "../services/api"
import { withRouter, Redirect } from "react-router";


class AdicionarArtigo extends React.Component {
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
        id: undefined,
        volumeId: undefined,
        redirect: false
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let volumeId = parseInt(this.props.match.params.volumeId);
        this.setState({volumeId})
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

        const idioma = this.state.idioma;
        const numeroPaginas = this.state.numeroPaginas;
        const ordem = this.state.ordem;
        const palavrasChaveEn = this.state.palavrasChaveEn;
        const palavrasChaveOriginal = this.state.palavrasChaveOriginal;
        const resumoOriginal = this.state.resumoOriginal;
        const resumoEn = this.state.resumoEn;
        const tituloOriginal = this.state.tituloOriginal;
        const tituloEn = this.state.tituloEn;
        const volumeId = this.state.volumeId;
        const id = this.state.id

        api
        .post('/artigo/registrar', {
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
        .then(()=>{
            this.setState({redirect: true})
        })
    }

    redirectToVolumeDono() {
        return <Redirect to={'/volume/' + this.state.volumeId} />
    }

    render() {
      return (
        <>
        <h2>Adicionar Artigo</h2>
        <form onSubmit={this.handleSubmit}>
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
            Páginas:
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
            Palavras Chave Inglês:
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
            Resumo em Inglês:
            <input
              name="resumoEn"
              type="text"
              value={this.state.resumoEn}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Resumo em Português:
            <input
              name="resumoOriginal"
              type="text"
              value={this.state.resumoOriginal}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Título em Inglês:
            <input
              name="tituloEn"
              type="text"
              value={this.state.tituloEn}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Título em Português:
            <input
              name="tituloOriginal"
              type="text"
              value={this.state.tituloOriginal}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <button type="submit">Adicionar</button>
        </form>
        {this.state.redirect ? this.redirectToVolumeDono() : ''}
        </>
      );
    }
}

export default withRouter(AdicionarArtigo);

  