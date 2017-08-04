import React, { Component } from 'react';
import './App.css';
import {
  Route, HashRouter
} from "react-router-dom";

import About from "./components/About";
import {Button, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import Player from "./components/Player";
import Event from "./components/Event";
import {Message} from "./components/common/Message";
import {health} from "./components/common/Api";
import {LinkContainer} from "react-router-bootstrap";

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      errorMessage: String,
      infoMessage: String,
      serverStatus : String
    };

    this.startErrorLog = this.startErrorLog.bind(this);
    this.onDismissInfoMessage = this.onDismissInfoMessage.bind(this);
    this.onDismissErrorMessage = this.onDismissErrorMessage.bind(this);
  }

  onDismissErrorMessage(){
    this.setState({errorMessage : ""})
  }

  onDismissInfoMessage(){
    this.setState({infoMessage : ""})
  }

  componentWillMount() {
      this.startErrorLog();
      this.setState({infoMessage: "Waiting for server, please wait"});
  }

  componentDidMount() {
    health().then((response)=> {
      this.setState({ infoMessage: "" });
      if(!response.ok)
        this.setState({ errorMessage: response.statusText })
    })
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
          <Message type="info" message={this.state.infoMessage} onDismiss={this.onDismissInfoMessage}/>
          <HashRouter>
            <div>
              <Navbar  collapseOnSelect className="shadowed">
                <Navbar.Header>
                  <Navbar.Brand>
                    OpenTeam
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem><LinkContainer to="/"><text>Home</text></LinkContainer></NavItem>
                    <NavItem><LinkContainer to="/players"><span>Players</span></LinkContainer></NavItem>
                    <NavItem><LinkContainer to="/event"><span>Event</span></LinkContainer></NavItem>

                  </Nav>
                  <Nav pullRight>
                    <NavItem><LinkContainer to="/about"><span>About</span></LinkContainer></NavItem>
                  </Nav>

                </Navbar.Collapse>
              </Navbar>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/players" component={Player}/>
              <Route path="/event/:id?" component={Event}/>
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
