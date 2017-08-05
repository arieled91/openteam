import React, { Component } from 'react';

import {
  Button, Checkbox, Col, Form, FormGroup, Glyphicon, Grid, Pagination, Row
} from "react-bootstrap";

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {FieldGroup} from "./common/Inputs";
import {client, clientPatch, clientPost} from "./common/Api";
import CheckboxFormatter from "./common/CheckboxFormatter";
import {appError} from "./common/Message";

const uuidv4 = require('uuid/v4');

export default class Player extends Component {

  static PAGE_SIZE = 15;

  constructor(props){
    super(props);
    this.state = {
      players : [],
      currentRow : {},
      editMode : false,
      searchText : "",
      activePage: Number,
      page: {
        size: Number,
        totalElements: Number,
        totalPages: Number,
        number: Number
      },

      //player form
      uuid : uuidv4(),
      playerName : "",
      playerEmail : "",
      playerGuest : false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onRowMouseOver = this.onRowMouseOver.bind(this);
    this.afterSearch = this.afterSearch.bind(this);
    this.onEditRow = this.onEditRow.bind(this);
    this.onPageSelect = this.onPageSelect.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentWillMount(){
    this.setState({
      activePage: 1,
      page: {totalPages: 1}
    });
    this.populate(0);
  }

  populate(pageNumber){
    let searchText = this.state.searchText;
    client(
        "players/search/findByNameContaining?name="+searchText+"&active=true&sort=name"+
        "&size="+Player.PAGE_SIZE+
        "&page="+pageNumber)
      .then((entity) => {
        const players = entity._embedded.players;
        players.forEach((player)=>{player.uuid = uuidv4()});
        this.setState({
            activePage: pageNumber+1,
            players: players,
            page : entity.page
        })
    }).catch((e)=>{
      appError("Server error");
    });

  }

  post(newPlayer){
    clientPost("players", newPlayer).then((player) => {
      this.populate(0);
    }).catch((e)=>{
      appError("Server error");
    })
  }

  patch(updatePlayer, path){
    console.log(updatePlayer);
    clientPatch(path, updatePlayer).then((player) => {
      this.populate(0);
    }).catch((e)=>{
      appError("Server error");
    })
  }

  onRowMouseOver(row){
    this.setState({currentRow: row})
  };

  afterSearch(text){
    if(text.length>2)
      this.setState({searchText: text});
    else
      this.setState({searchText: ""});

    this.populate(0)
  }

  onSubmit(e){
    this.state.editMode ? this.update(e) : this.create(e);
    this.reset();
    console.log(this.state.playerGuest);
    e.preventDefault();
  }

  reset(){
      this.setState({
          editMode: false,
          uuid: uuidv4(),
          playerName: "",
          playerEmail: "",
          playerGuest: false
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



  onDeleteRow() {
    if (window.confirm("Are you sure you want to remove the player?")) {
      const row = this.state.currentRow;

      let players =  this.state.players;
      const player = players.find(
          player => player.uuid===row.uuid
      );


      player.active = false;

      this.patch(player, player._links.self.href);

      this.reset();
    }
  }

  onEditRow(){
    this.setState({
      playerName: this.state.currentRow.name,
      playerEmail: this.state.currentRow.email,
      uuid : this.state.currentRow.uuid,
      playerGuest : this.state.currentRow.guest,
      editMode: true
    });
    this.playerName.focus();
  }

  onPageSelect(eventKey) {
    this.populate(eventKey-1);
  }


  buttonsFormatter=(onDelete, onEdit)=>{

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
      this.setState({ playerGuest: event.target.checked});
  };

  selectRowProp = {
    mode: 'radio',
    bgColor: '#EAEAEA',
    hideSelectColumn: true,
    clickToSelect: true,
  };

  render() {

    const options = {
      onRowMouseOver: this.onRowMouseOver,
      afterSearch: this.afterSearch
    };

    return (
        <div>
          <Grid className="shadowed form-container">
            <Form onSubmit={this.onSubmit} style={{marginBottom: '3%'}}>
              <Row>
                <FieldGroup
                    id="playerName"
                    type="text"
                    label="Name"
                    placeholder="Enter Name"
                    value={this.state.playerName}
                    onChange={this.playerNameChanged}
                    inputRef={input => this.playerName = input}
                    colxs={9}
                    colmd={4}
                    required
                />
                <Col xs={3} md={2}>
                  <Checkbox
                      id="playerGuest"
                      checked={this.state.playerGuest}
                      inputRef={input => this.playerGuest = input}
                      onChange={this.playerGuestChanged}
                      style={{marginTop:"30px"}}>
                    Guest
                  </Checkbox>
                </Col>
                <FieldGroup
                    id="playerEmail"
                    type="email"
                    label="Email address"
                    value={this.state.playerEmail}
                    onChange={this.playerEmailChanged}
                    inputRef={input => this.playerEmail = input}
                    placeholder="Enter email"
                    colxs={9}
                    colmd={4}
                />
                <Col xs={3} md={2}>
                  <FormGroup>
                    <Button type="submit" className={"btn btn-primary "+(this.state.editMode ? "hide":"")} style={{marginTop:"25px"}}>
                      <Glyphicon glyph="plus" style={{marginRight:'5px'}}/>
                        Add
                    </Button>
                    <Button type="submit" className={"btn btn-success "+(this.state.editMode ? "":"hide")} style={{marginTop:"25px"}}>
                      <Glyphicon glyph="floppy-disk" style={{marginRight:'5px'}}/>
                      Save
                    </Button>
                    <Button className={"btn btn-default "+(this.state.playerName!=="" ? "":"hide")} style={{marginTop:"25px", marginLeft:'20px'}} onClick={this.reset}>
                      <Glyphicon glyph="remove" style={{marginRight:'5px'}}/>
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>

            <BootstrapTable
                data={this.state.players}
                striped
                remote={ true }
                selectRow={this.selectRowProp}
                options={options}
                search={true}
                hover>
              <TableHeaderColumn isKey dataField='uuid' hidden={true}/>
              <TableHeaderColumn dataField='name' >Player Name</TableHeaderColumn>
              <TableHeaderColumn dataField='email' >Email</TableHeaderColumn>
              <TableHeaderColumn dataField='guest' dataFormat={Player.checkboxFormatter } width={"20%"} dataAlign={'center'}>Guest</TableHeaderColumn>
              <TableHeaderColumn dataFormat={() => this.buttonsFormatter(this.onDeleteRow, this.onEditRow)} width={"80px"} />
            </BootstrapTable>

            <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={this.state.page.totalPages}
                maxButtons={5}
                activePage={this.state.activePage}
                onSelect={this.onPageSelect}
                style={{marginTop:'5px'}}
            />
          </Grid>
        </div>
    )
  }
}