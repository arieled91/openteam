import React, { Component } from 'react';

import {
  Button,
  Checkbox, Col, FormGroup, Glyphicon, Grid, Row
} from "react-bootstrap";

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {FieldGroup} from "./common/FieldGroup";
import {client} from "./common/Api";
import {Message} from "./common/Message";
import CheckboxFormatter from "./common/CheckboxFormatter";

const uuidv4 = require('uuid/v4');

export default class Player extends Component {

  constructor(props){
    super(props);
    this.state = {
      players : [],
      playersTable : [],
      errorMessage : String,
      currentRow : {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onRowMouseOver = this.onRowMouseOver.bind(this);
    this.onDismissErrorMessage = this.onDismissErrorMessage.bind(this);
    this.afterSearch = this.afterSearch.bind(this);
    // this.populateTable = this.populateTable.bind(this);
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
      this.setState({
          players: entity._embedded.players,
          playersTable: entity._embedded.players
      })
    }).catch((e)=>{
      this.setState({errorMessage: "Back-end server not found"})
    })

  }

  onDismissErrorMessage(){
    this.setState({errorMessage : ""})
  }

  onRowMouseOver(row){
    this.setState({currentRow: row})
  };

  afterSearch(text){
    if(text.length>2){
      const players = this.state.players;
      console.log(text);
      this.setState({playersTable: players.filter(player =>{
        return player.name.toUpperCase().includes(text.toUpperCase()) || player.email.toUpperCase().includes(text.toUpperCase());
      })});
      console.log(this.state.playersTable)
    }else{
      this.setState({playersTable: this.state.players});
    }

  }

  // populateTable(){
  //     this.setState({playersTable: this.state.players});
  // }


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
      players: newPlayers,
      playersTable: newPlayers
    });

    e.preventDefault();
  }


  onDeleteRow() {
    const row = this.state.currentRow;

    let filtered = this.state.players.filter(player => {
      return player.uuid !== row.uuid;
    });

    this.setState({
      players: filtered,
      playersTable: filtered
    });
  }


  deleteButtonFormatter=(onClick)=>{
      return (<a onClick={onClick}><Glyphicon glyph="trash"/></a>);
  };

  editButtonFormatter=(onClick)=>{
      return (<a onClick={onClick}><Glyphicon glyph="edit"/></a>);
  };

  checkboxFormatter(cell, row) {
      return (<CheckboxFormatter active={ cell } />);
  }

  filterType(cell, row) {
        // just return type for filtering or searching.
      console.log(cell);
        return cell.type;
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
                    colxs={7}
                    colmd={4}
                    required
                />
                <Col xs={5} md={2}>
                  <Checkbox id="playerTeamMember" style={{marginTop:"30px"}}>Team Member</Checkbox>
                </Col>
                <FieldGroup
                    id="playerEmail"
                    type="email"
                    label="Email address"
                    placeholder="Enter email"
                    colxs={7}
                    colmd={4}
                />
                <Col xs={5} md={2}>
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
                data={this.state.playersTable}
                striped
                pagination
                remote={ true }
                selectRow={this.selectRowProp}
                options={{onRowMouseOver: this.onRowMouseOver, afterSearch: this.afterSearch }}
                search={true}
                hover>
              <TableHeaderColumn isKey dataField='uuid' hidden={true}/>
              <TableHeaderColumn dataField='name' filterValue={this.filterType} l>Player Name</TableHeaderColumn>
              <TableHeaderColumn dataField='email' filterValue={this.filterType}>Email</TableHeaderColumn>
              <TableHeaderColumn dataField='teamMember' dataFormat={this.checkboxFormatter }  width={"20%"} dataAlign={'center'}>Team Member</TableHeaderColumn>
              <TableHeaderColumn dataFormat={() => this.deleteButtonFormatter(this.onDeleteRow)} width={"60px"} />
              <TableHeaderColumn dataFormat={() => this.editButtonFormatter(this.onDeleteRow)} width={"60px"} /> //todo edit action
            </BootstrapTable>
          </Grid>
        </div>
    )
  }
}