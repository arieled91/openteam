import React, { Component } from 'react';

import {
  Button,
  Checkbox, Col, FormGroup, Glyphicon, Grid, Row
} from "react-bootstrap";

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {FieldGroup} from "./common/FieldGroup";
import {checkboxFormatter} from "./common/TableCheckbox";
import {client} from "./common/Api";
import {Message} from "./common/Message";

const uuidv4 = require('uuid/v4');

export default class Player extends Component {

  constructor(props){
    super(props);
    this.state = {
      players : [],
      errorMessage : String
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onDismissErrorMessage = this.onDismissErrorMessage.bind(this);
  }

  componentDidMount() {
    // client({method: 'GET', path: '/api/players'}).done(response => {
    //   this.setState({players: response.entity._embedded.players});
    // });

    // fetch(api+'/players')
    //   .then((response)=>{
    //     return response.json()
    //   })
    //   .then((entity) => {
    //     entity._embedded.players.forEach((player)=>{player.uuid = uuidv4()});
    //     this.setState({ players: entity._embedded.players})
    //   })

    client("/players").then((entity) => {
      entity._embedded.players.forEach((player)=>{player.uuid = uuidv4()});
      this.setState({ players: entity._embedded.players})
    }).catch((e)=>{
      this.setState({errorMessage: "Back-end server not found"})
    })

  }

  onDismissErrorMessage(){
    this.setState({errorMessage : ""})
  }


  onSubmit(e){
    const newPlayers = this.state.players.concat({
      uuid : uuidv4(),
      name : e.target.playerName.value,
      email : e.target.playerEmail.value,
      teamMember : e.target.playerTeamMember.checked,
      active : true
    });

    e.target.playerName.value="";
    e.target.playerEmail.value="";
    e.target.playerTeamMember.checked=false;

    this.setState({
      players: newPlayers
    });

    e.preventDefault();
  }


  onDeleteRow(row) {


    let filtered = this.state.players.filter(player => {
      return player.uuid !== row[0];
    });

    this.setState({
      players: filtered
    });
  }

  selectRowProp = {
    mode: 'radio',
    bgColor: '#EAEAEA', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
    hideSelectColumn: true,  // enable hide selection column.
    clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
  };

  render() {
    return (
        <div>
          <Message type="danger" message={this.state.errorMessage} onDismiss={this.onDismissErrorMessage}/>
          <Grid>
            <form onSubmit={this.onSubmit}>
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
                  <Checkbox id="playerTeamMember" style={{marginTop:"30px"}}>Team Member</Checkbox>
                </Col>
                <FieldGroup
                    id="playerEmail"
                    type="email"
                    label="Email address"
                    placeholder="Enter email"
                    colxs="7"
                    colmd="4"
                />
                <Col xs="5" md="2">
                  <FormGroup>
                    <Button type="submit" className="btn btn-primary" style={{marginTop:"24px"}}>
                      <Glyphicon glyph="plus" style={{marginRight:'5px'}}/>
                        Add
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </form>

            <BootstrapTable
                data={this.state.players}
                striped
                remote={ true }
                deleteRow={true}
                selectRow={this.selectRowProp}
                options={ { onDeleteRow: this.onDeleteRow } }
                hover>
              <TableHeaderColumn isKey dataField='uuid' hidden={true}/>
              <TableHeaderColumn dataField='name'>Player Name</TableHeaderColumn>
              <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
              <TableHeaderColumn dataField='teamMember' dataFormat={ checkboxFormatter }>Team Member</TableHeaderColumn>
            </BootstrapTable>
          </Grid>
        </div>

    )
  }
}