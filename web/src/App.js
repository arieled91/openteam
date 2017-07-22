import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route
} from "react-router-dom";

import About from "./components/About";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import Player from "./components/Player";

export default class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">OpenTeam</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem><Link to="/">Home</Link></NavItem>
                  <NavItem><Link to="/players">Players</Link></NavItem>

                </Nav>
                <Nav pullRight>
                  <NavItem><Link to="/about">About</Link></NavItem>
                </Nav>

              </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/players" component={Player}/>
          </div>
        </Router>
    );
  }
}

const Home = () => (
    <div>
      <h2>Home</h2>
    </div>
);
