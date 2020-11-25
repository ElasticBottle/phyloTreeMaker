import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AppStyles from "./App.module.css";
import UploadPage from "./pages/uploadPage/uploadPage";
import ResultsPage from "./pages/resultsPage/resultsPage";
import LoadingPage from "./pages/loadingPage/loadingPage";

function App() {
  const [results, setResults] = React.useState("");
  return (
    <Router basename="/METHODS/corona/gamma/phyloMaker/build">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className={AppStyles.title}>Phylo Tree Maker</h1>
      </Link>
      <Switch>
        <Route exact={true} path="/">
          <UploadPage setResults={setResults} />
        </Route>
        <Route exact={true} path="/results">
          <ResultsPage results={results} />
        </Route>
        <Route exact={true} path="/loading">
          <LoadingPage />
        </Route>
        <Route path="*">
          <div>404 Page not Found.</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
