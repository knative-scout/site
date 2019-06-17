import React, { FunctionComponent, Component } from 'react';
import logo from './logo.svg';
import { Preview } from './pages/Preview';
import { Switch, Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { AppGrid } from './components/AppGrid';
import { AppHub } from './pages/AppHub';
import { KSPage } from './pages/KSPage';
import { AppDetails } from './pages/AppDetails';
import { AppHubSidebar } from './components/AppHubSidebar';
import {Main} from './pages/Main';
import {LearnMore} from './pages/Documentation';

const App: React.FC = (props) => {

  const history = createBrowserHistory();


  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Main}></Route>
      </Switch>
      <Switch>
        <Route path="/apps" exact component={AppHub}></Route>
      </Switch>
      <Switch>
        <Route path="/apps/:appid" component={AppDetails}></Route>
      </Switch>
      <Switch>
        <Route path="/preview/:appid" component={Preview}></Route>
      </Switch>
      <Switch>
        <Route path="/learn" component={LearnMore}></Route>
      </Switch>
    </Router>
  );
}

export default App;
