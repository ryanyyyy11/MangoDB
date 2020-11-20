import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Account from "./components/account.component"
import Main from "./components/mainpage.component";

const App = () => {

  return (
      <Router>
              <Switch>
                <Route exact path='/' component={Main} />
                <Route path="/sign-in" component={Login}/>
                <Route path="/sign-up" component={SignUp} />
                <Route path="/Account/:id" component={Account}/>
              </Switch>
      </Router>
  );
}

export default App;