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
      currentRow : {},
      editMode : false,

      //player form
      uuid : uuidv4(),
      playerName : "",
      playerEmail : "",
      playerTeamMember : false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onRowMouseOver = this.onRowMouseOver.bind(this);
    this.onDismissErrorMessage = this.onDismissErrorMessage.bind(this);
    this.afterSearch = this.afterSearch.bind(this);
    this.onEditRow = this.onEditRow.bind(this);
    this.playerNameChanged = this.playerNameChanged.bind(this);
    this.playerEmailChanged = this.playerEmailChanged.bind(this);
    this.playerTeamMemberChanged = this.playerTeamMemberChanged.bind(this);
  }

  componentDidMount() {
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

  onSubmit(e){
    const players = this.state.editMode ? this.update(e) : this.create(e);

    this.setState({
      players: players,
      playersTable: players,
      editMode: false,

      uuid: uuidv4(),
      playerName: "",
      playerEmail: "",
      playerTeamMember:false
    });

    e.preventDefault();
  }

  create(e){
    return this.state.players.concat({
      uuid: uuidv4(),
      name: e.target.playerName.value,
      email: e.target.playerEmail.value,
      teamMember: e.target.playerTeamMember.checked,
      active: true
    });
  }

  update(e){
    let players =  this.state.players;
    const player = players.find(
        player => player.uuid===this.state.uuid
    );

    player.name = this.state.playerName;
    player.email = this.state.playerEmail;
    player.teamMember = this.state.playerTeamMember;

    // return this.state.players.filter(
    //     player => player.uuid===this.state.editPlayer.uuid
    // ).concat(player);
    return players;
  }



  onDeleteRow() {
    if (window.confirm("Are you sure you want to remove the player?")) {
      const row = this.state.currentRow;

      let filtered = this.state.players.filter(player => {
        return player.uuid !== row.uuid;
      });

      this.setState({
        players: filtered,
        playersTable: filtered
      });
    }
  }

  onEditRow(){
    this.setState({
      playerName: this.state.currentRow.name,
      playerEmail: this.state.currentRow.email,
      uuid : this.state.currentRow.uuid,
      playerTeamMember : this.state.currentRow.teamTember,
      editMode: true
    })
  }


  deleteButtonFormatter=(onDelete, onEdit)=>{

    const style={
      marginRight:'10px',
      marginLeft:'10px'
    };

    return (
        <div>
          <a onClick={onDelete} style={style}><Glyphicon glyph="trash"/></a>
          <a onClick={onEdit} style={style}><Glyphicon glyph="edit"/></a>
        </div>
    );
  };



  playerNameChanged = (event) => {
      this.setState({ playerName: event.target.value });
  };

  playerEmailChanged = (event) => {
      this.setState({ playerEmail: event.target.value });
  };

  playerTeamMemberChanged = (event) => {
      this.setState({ playerTeamMember: event.target.value });
  };

  editButtonFormatter=(onClick)=>{
      return (<a onClick={onClick}><Glyphicon glyph="edit"/></a>);
  };

  static checkboxFormatter(cell, row) {
      return (<CheckboxFormatter active={ cell } />);
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
                    autoFocus
                    placeholder="Enter Name"
                    value={this.state.playerName}
                    onChange={this.playerNameChanged}
                    colxs={7}
                    colmd={4}
                    required
                />
                <Col xs={5} md={2}>
                  <Checkbox
                      id="playerTeamMember"
                      value={this.state.playerTeamMember}
                      onChange={this.playerTeamMemberChanged}
                      style={{marginTop:"30px"}}>
                    Team Member
                  </Checkbox>
                </Col>
                <FieldGroup
                    id="playerEmail"
                    type="email"
                    label="Email address"
                    value={this.state.playerEmail}
                    onChange={this.playerEmailChanged}
                    placeholder="Enter email"
                    colxs={7}
                    colmd={4}
                />
                <Col xs={5} md={2}>
                  <FormGroup>
                    <Button type="submit" className={"btn btn-primary "+(this.state.editMode ? "hide":"")} style={{marginTop:"24px"}}>
                      <Glyphicon glyph="plus" style={{marginRight:'5px'}}/>
                        Add
                    </Button>
                    <Button type="submit" className={"btn btn-success "+(this.state.editMode ? "":"hide")} style={{marginTop:"24px"}}>
                      <Glyphicon glyph="floppy-disk" style={{marginRight:'5px'}}/>
                      Save
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
              <TableHeaderColumn dataField='name' >Player Name</TableHeaderColumn>
              <TableHeaderColumn dataField='email' >Email</TableHeaderColumn>
              <TableHeaderColumn dataField='teamMember' dataFormat={Player.checkboxFormatter } width={"20%"} dataAlign={'center'}>Team Member</TableHeaderColumn>
              <TableHeaderColumn dataFormat={() => this.deleteButtonFormatter(this.onDeleteRow, this.onEditRow)} width={"80px"} />
            </BootstrapTable>
          </Grid>
        </div>
    )
  }
}