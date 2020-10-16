import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {NavbarComponent} from './Components/';
import {Home, Sukses} from './pages'


export default class App extends Component {
  render() {
    return (
      <Router>
        <NavbarComponent/>
        <main>
          <Switch>
            
            <Route path="/sukses" exact component={Sukses}/>
            <Route path="/" component={Home}/>
          </Switch>
        </main>
      </Router>
    )
  }
}
