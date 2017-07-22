import React, { Component } from 'react';

import {
    Button,
    Checkbox, Col, FormGroup, Glyphicon, Grid, Pagination, Row
} from "react-bootstrap";

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {FieldGroup} from "./common/FieldGroup";
import {clientGet, clientPatch, clientPost} from "./common/Api";
import {Message} from "./common/Message";
import CheckboxFormatter from "./common/CheckboxFormatter";

const uuidv4 = require('uuid/v4');

export default class Player extends Component {

  static PAGE_SIZE = 5;
  static MAX_ROW_SIZE = 100;

  constructor(props){
    super(props);
    this.state = {
      players : [],
      errorMessage : String,
      currentRow : {},
      editMode : false,
      searchText : "",
      activePage : 1,
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
    this.onDismissErrorMessage = this.onDismissErrorMessage.bind(this);
    this.afterSearch = this.afterSearch.bind(this);
    this.onEditRow = this.onEditRow.bind(this);
    this.onPageSelect = this.onPageSelect.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.populate();
  }

  populate(){
      let searchText = this.state.searchText;
      clientGet(
          "players/search/findByNameIgnoreCaseContainingOrderByName?name="+searchText+
          "&size="+Player.PAGE_SIZE+
          "&page="+(this.state.activePage))
        .then((entity) => {
          const players = entity._embedded.players;
          players.forEach((player)=>{player.uuid = uuidv4()});
          this.setState({
              players: players,
              page : entity.page
          })
      }).catch((e)=>{
          this.setState({errorMessage: "Back-end server error"})
      })
  }

  post(newPlayer){
    clientPost("players", newPlayer).then((player) => {
      this.populate();
    }).catch((e)=>{
      this.setState({errorMessage: "Back-end server error"})
    })
  }

  patch(updatePlayer, path){
    clientPatch(path, updatePlayer).then((player) => {
      this.populate();
    }).catch((e)=>{
      this.setState({errorMessage: "Back-end server error"})
    })
  }

  onDismissErrorMessage(){
    this.setState({errorMessage : ""})
  }

  onRowMouseOver(row){
    this.setState({currentRow: row})
  };

  afterSearch(text){
    if(text.length>2)
      this.setState({searchText: text});
    else
      this.setState({searchText: ""});

    this.populate()
  }

  onSubmit(e){
    this.state.editMode ? this.update(e) : this.create(e);
    this.reset();
    e.preventDefault();
  }

  reset(){
      this.setState({
          editMode: false,
          uuid: uuidv4(),
          playerName: "",
          playerEmail: "",
          playerGuest:false
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

      let filtered = this.state.players.filter(player => {
        return player.uuid !== row.uuid;
      });

      this.setState({
          players: filtered
      });

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

  onPageSelect(page) {
    console.log(page);
      this.setState({
          activePage: page
      });

      this.populate();
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
      this.setState({ playerGuest: event.target.value });
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
                    inputRef={input => this.playerName = input}
                    colxs={7}
                    colmd={4}
                    required
                />
                <Col xs={5} md={2}>
                  <Checkbox
                      id="playerGuest"
                      value={this.state.playerGuest}
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
                    <Button className={"btn btn-default "+(this.state.playerName!=="" ? "":"hide")} style={{marginTop:"24px", marginLeft:'20px'}} onClick={this.reset}>
                      <Glyphicon glyph="remove" style={{marginRight:'5px'}}/>
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </form>

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