import React from 'react';
import logo from './logo.svg';
import { Preview } from './pages/Preview';
import { Switch, Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';

const App: React.FC = () => {

  const history = createBrowserHistory();

  return (
    <div className="App">
      <header className="App-header">
        <h1>KScout.io In Development</h1>
        <p>KScout.io is a smart hub for serverless kubernetes applications.
          you can find the repository to follow along with or contribute to development <a href='https://github.com/knative-scout/kscout.io'>on GitHub</a>
        </p>
      </header>

    <Router history={history}>
      <Switch>
        <Route path="/preview/:appid" component={Preview}></Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
