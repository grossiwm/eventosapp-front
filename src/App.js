import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Home from "./components/Home";
import Volume from "./components/Volume";
import Artigo from "./components/Artigo";
import Autor from "./components/Autor";
import AlterarVolume from "./components/AlterarVolume";
import AlterarArtigo from "./components/AlterarArtigo";
import AlterarAutor from "./components/AlterarAutor";
import AdicionarVolume from "./components/AdicionarVolume";
import AdicionarArtigo from "./components/AdicionarArtigo";
import AdicionarAutor from "./components/AdicionarAutor";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Volumes</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/volume/alterar/:id">
            <AlterarVolume />
          </Route>
          <Route path="/volume/registrar">
            <AdicionarVolume />
          </Route>
          <Route path="/volume/:id">
            <Volume />
          </Route>
          <Route path="/artigo/registrar/:volumeId">
            <AdicionarArtigo />
          </Route>
          <Route path="/artigo/alterar/:id/:volumeId">
            <AlterarArtigo />
          </Route>
          <Route path="/artigo/:id/:volumeId">
            <Artigo />
          </Route>
          <Route path="/autor/registrar/:artigoId/:volumeId">
            <AdicionarAutor />
          </Route>
          <Route path="/autor/alterar/:id/:artigoId">
            <AlterarAutor />
          </Route>
          <Route path="/autor/:id/:artigoId">
            <Autor />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}