import React, { Component } from 'react';
import './App.css';
import {
  Link, Route, HashRouter
} from "react-router-dom";

import About from "./components/About";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import Player from "./components/Player";
import Event from "./components/Event";
import {Message} from "./components/common/Message";
import {ping} from "./components/common/Api";

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      errorMessage: String
    };

    this.onDismissErrorMessage = this.onDismissErrorMessage.bind(this);
    this.startErrorLog = this.startErrorLog.bind(this);
  }

  onDismissErrorMessage(){
    this.setState({errorMessage : ""})
  }

  componentWillMount() {
    this.startErrorLog();
    console.log(ping());
  }


  startErrorLog() {
    window.onerror = (message, file, line, column, errorObject) => {
      this.setState({errorMessage: errorObject});
      return false;
    }
  }

  render() {
    return (
        <div>
          <Message type="danger" message={this.state.errorMessage} onDismiss={this.onDismissErrorMessage}/>
          <HashRouter>
            <div>
              <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    OpenTeam
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem><Link to="/">Home</Link></NavItem>
                    <NavItem><Link to="/players">Players</Link></NavItem>
                    <NavItem><Link to="/event">Event</Link></NavItem>

                  </Nav>
                  <Nav pullRight>
                    <NavItem><Link to="/about">About</Link></NavItem>
                  </Nav>

                </Navbar.Collapse>
              </Navbar>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/players" component={Player}/>
              <Route path="/event/:id" component={Event}/>
            </div>
          </HashRouter>
        </div>
    );
  }
}

const Home = () => (
    <div>
      <h2>Home</h2>
    </div>
);
