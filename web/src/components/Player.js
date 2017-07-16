import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import {
  Button,
  Checkbox, Col, ControlLabel, FormControl, FormGroup, Glyphicon, Grid,
  HelpBlock,
  Row
} from "react-bootstrap";

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {FieldGroup} from "./common/FieldGroup";
import {TableCheckbox} from "./common/TableCheckbox";

export default class Player extends Component {

  constructor(props){
    super(props);
    this.state = {
      players : []
    };

    this.addNewPlayer = this.addNewPlayer.bind(this);
  }

  addNewPlayer(e){

    const newPlayers = this.state.players.concat({
      name : e.target.playerName.value,
      email : e.target.playerEmail.value,
      teamMember : e.target.playerTeamMember.checked
    });

    this.setState({
      players: newPlayers
    });

    e.preventDefault();
  }


  render() {
    return (
        <form onSubmit={this.addNewPlayer}>
          <Grid>
            <Row>
              <FieldGroup
                  id="playerName"
                  type="text"
                  label="Name"
                  placeholder="Enter Name"
                  colxs="7"
                  colmd="4"
                  required
              />
              <Col xs="5" md="2">
                <ControlLabel>Team Member</ControlLabel>
                <Checkbox id="playerTeamMember"/>
              </Col>
              <FieldGroup
                  id="playerEmail"
                  type="email"
                  label="Email address"
                  placeholder="Enter email"
                  colxs="7"
                  colmd="4"
              />
              <Col xs="3" md="2">
                <FormGroup>
                  <Button type="submit" className="btn btn-primary" style={{marginTop:"24px"}}>
                    Add
                  </Button>
                </FormGroup>
              </Col>
            </Row>

          </Grid>

          <BootstrapTable data={this.state.players} striped hover>
            <TableHeaderColumn isKey dataField='id' hidden={true}>Product ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name'>Player Name</TableHeaderColumn>
            <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
            <TableHeaderColumn dataField='teamMember' dataFormat={ TableCheckbox }>Team Member</TableHeaderColumn>
          </BootstrapTable>

        </form>

    )
  }
}