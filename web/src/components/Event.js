import React, { Component } from 'react';

import {
  Button, Checkbox, Col, Form, FormGroup, Glyphicon, Grid, Pagination, Row
} from "react-bootstrap";

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {FieldGroup} from "./common/FieldGroup";
import {client, clientPatch, clientPost} from "./common/Api";
import CheckboxFormatter from "./common/CheckboxFormatter";
import {appError} from "./common/Message";

const uuidv4 = require('uuid/v4');

export default class Event extends Component {

  static PAGE_SIZE = 15;

  constructor(props){
    super(props);
    this.state = {
      id : props.match.params.id,
      event : {},
      teams : {},
    };



    this.onSubmit = this.onSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentWillMount(){

  }

  populate(){

  }

  post(entity){
    clientPost("players", entity).then(() => {
      this.populate();
    }).catch((e)=>{
      appError("Server error");
    })
  }

  patch(entity, path){
    clientPatch(path, entity).then(() => {
      this.populate();
    }).catch((e)=>{
      appError("Server error");
    })
  }


  onSubmit(e){
    this.state.editMode ? this.update(e) : this.create(e);
    this.reset();
    e.preventDefault();
  }

  reset(){
      this.setState({
      });
  }

  create(e){
    this.post(this.copyTo({}));
  }

  copyTo(player){
    player.name = this.state.playerName;
    player.email = this.state.playerEmail;
    player.guest = this.state.playerGuest;
    return player;
  }

  update(e){
    let players =  this.state.players;
    const player = players.find(
        player => player.uuid===this.state.uuid
    );

    this.patch(this.copyTo({uuid : player.uuid}), player._links.self.href);
  }






  static checkboxFormatter(cell, row) {
    return (<CheckboxFormatter active={ cell } />);
  }

  playerNameChanged = (event) => {
      this.setState({ playerName: event.target.value });
  };

  playerEmailChanged = (event) => {
      this.setState({ playerEmail: event.target.value });
  };

  playerGuestChanged = (event) => {
      this.setState({ playerGuest: event.target.value });
  };


  render() {

    return (
        <div>
          <Grid>
            <Form onSubmit={this.onSubmit}>
              <Row>

              </Row>
            </Form>


          </Grid>
        </div>
    )
  }
}