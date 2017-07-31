import React, { Component } from 'react';

import {
  Button, Col, ControlLabel, Form, FormGroup, Glyphicon, Grid, ListGroup,
  ListGroupItem, Row
} from "react-bootstrap";

import {FieldGroup, SearchBox} from "./common/Inputs";
import {
  client, clientAdd, clientLink, clientPatch,
  clientPost
} from "./common/Api";
import {appError} from "./common/Message";
import {isDefined} from "../common/Util";
import {dateTimeFormat} from "./common/Utils";

export default class Event extends Component {


  constructor(props){
    super(props);
    this.state = {
      id : props.match.params.id,
      event : {},
      teams : [],

      eventName : "",
      eventDate : "",
      playerSearch : "",
      playerSearchSuggestions : [],
      eventSearchSuggestions : [],
      editMode : false,
      eventSearch : ""
    };


    this.onSubmit = this.onSubmit.bind(this);
    this.reset = this.reset.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onSearchPlayer = this.onSearchPlayer.bind(this);
    this.onClickAddPlayer = this.onClickAddPlayer.bind(this);
    this.onSearchEvent = this.onSearchEvent.bind(this);
    this.onClickEventSearch = this.onClickEventSearch.bind(this);
  }
  componentWillMount(){
      this.populate();
  }

  populate(){
      console.log("events/search/findByUuid?uuid="+this.state.id);
      if(isDefined(this.state.id)) {
        client("events/search/findByUuid?uuid="+this.state.id).then((entity) => {
              clientLink(entity._links.teams.href).then((teamsResponse) => {
                  this.setState({
                      event: entity,
                      eventName: entity.name,
                      eventDate: entity.dateTime,
                      teams: teamsResponse._embedded.teams,
                      editMode: true
                  });
              });
          }).catch((e) => {
              appError("Server error");
          });
      }

      this.populatePlayerSuggestions();
  }

  populatePlayerSuggestions(){
    client(
        "players/search/findByNameContaining?name="+this.state.playerSearch+"&active=true&size="+10)
    .then((entity) => {
      const players = entity._embedded.players;
      players
      .forEach((player)=>{
        player.sortKey = player._links.self.href;
        player.value = player.name;
      });
      this.setState({
        playerSearchSuggestions : players
      })
    }).catch((e)=>{
      appError("Server error");
    });
  }

  populateEventSuggestions(){
    client(
        "events/search/findByNameIgnoreCaseContainingOrderByDateTimeDesc?name="+this.state.eventSearch+"&size="+10)
    .then((entity) => {
      const events = entity._embedded.events;
      events
      .forEach((event)=>{
        event.sortKey = event._links.self.href;
        // event.value = event.name + " ("+dateFormat(event.dateTime, "dd/mm/yyyy, h:MM")+")";

        event.value = event.name + " ("+dateTimeFormat(event.dateTime)+")";
      });
      this.setState({
        eventSearchSuggestions : events
      })
    }).catch((e)=>{
      appError("Server error");
    });
  }

  post(entity){
    clientPost("events", entity).then((entity) => {
      this.setState({id: entity.uuid});
      this.populate();
    }).catch((e)=>{
      appError("Server error");
    })
  }

  patch(entity, path){
    // clientPatch(path, entity).then(() => {
    //   this.populate();
    // }).catch((e)=>{
    //   appError("Server error");
    // })
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

  copyTo(event){
    event.name = this.state.eventName;
    event.dateTime = this.state.eventDate;
    return event;
  }

  update(e){
    // let players =  this.state.players;
    // const player = players.find(
    //     player => player.id===this.state.id
    // );
    //
    // this.patch(this.copyTo({id : player.id}), player._links.self.href);
  }


  onDragStart(e){
    console.log(e);
  }
  onDrop(component, e){
      console.log(component, e);
  }

  onDragEnter(component, e){
      console.log(component, e);
  };
  onDragOver(component, e){
      console.log(component, e);
  };

  onSearchEvent(){
    this.populateEventSuggestions();
  }

  onClickAddPlayer(){
    const playerLink = this.state.playerSearch.sortKey;
    clientAdd(this.state.teams[0]._links.players.href, playerLink).catch(()=>{});
    this.setState({playerSearch: ""})
  }


  onSearchPlayer(search, page, prev) {
    this.populatePlayerSuggestions();
  };

  onClickEventSearch(){
    // const uuid = this.state.eventSearch.uuid;
    // this.setState({id: uuid});
    // this.populate();
      this.props.history.push('/event/'+this.state.eventSearch.uuid);
      this.props.history.go();
  }


  eventNameChanged = (event) => {
    this.setState({ eventName: event.target.value });
  };

  eventDateChanged = (event) => {
    this.setState({ eventDate: event.target.value });
  };

  playerSearchChanged = (value) => {
    this.setState({ playerSearch: value });
  };

  eventSearchChanged = (value) => {
    this.setState({ eventSearch: value });
  };




  render() {
    return (
        <div>
          <Grid>
            <Form onSubmit={this.onSubmit}>
              <Row>
                <SearchBox
                    id="eventSearch"
                    label="Search"
                    colxs={7}
                    colmd={4}
                    value={this.state.eventSearch}
                    onSearch={this.onSearchEvent}
                    onChange={this.eventSearchChanged}
                    suggestions={this.state.eventSearchSuggestions}
                    searchDebounce={300}
                    placeholder="Event..."
                />
                <Button
                  disabled={!isDefined(this.state.eventSearch)}
                  style={{marginTop:"25px"}}
                  className={"btn btn-primary"}
                  onClick={this.onClickEventSearch}>
                  <Glyphicon glyph="search"/>
                </Button>
              </Row>
              <Row>
                <FieldGroup
                    id="eventName"
                    type="text"
                    label="Name"
                    placeholder="Enter Name"
                    value={this.state.eventName}
                    onChange={this.eventNameChanged}
                    inputRef={input => this.eventName = input}
                    colxs={7}
                    colmd={4}
                    required
                />
                  <FieldGroup
                    id="eventDate"
                    type="datetime-local"
                    label="Date"
                    min={this.state.currentDateTime}
                    placeholder="Enter Date"
                    value={this.state.eventDate}
                    onChange={this.eventDateChanged}
                    inputRef={input => this.eventDate = input}
                    colxs={7}
                    colmd={4}
                    required
                />

                <Col xs={5} md={2}>
                  <FormGroup>
                    <Button type="submit" className={"btn btn-primary "+(this.state.editMode ? "hide":"")} style={{marginTop:"25px"}}>
                      <Glyphicon glyph="plus" style={{marginRight:'5px'}}/>
                      Add
                    </Button>
                    <Button type="submit" className={"btn btn-success "+(this.state.editMode ? "":"hide")} style={{marginTop:"25px"}}>
                      <Glyphicon glyph="floppy-disk" style={{marginRight:'5px'}}/>
                      Save
                    </Button>
                    <Button className={"btn btn-default "+(isDefined(this.state.id) ? "":"hide")} style={{marginTop:"25px", marginLeft:'20px'}} onClick={this.reset}>
                      <Glyphicon glyph="remove" style={{marginRight:'5px'}}/>
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
              <div id="eventTeamPlayers" hidden={!isDefined(this.state.id)}>
                <Row>
                  <SearchBox
                      id="playerSearch"
                      label="Add Player"
                      colxs={7}
                      colmd={4}
                      value={this.state.playerSearch}
                      onSearch={this.onSearchPlayer}
                      onChange={this.playerSearchChanged}
                      suggestions={this.state.playerSearchSuggestions}
                      searchDebounce={300}
                      placeholder="Enter player to add"
                  />
                  <Button
                      disabled={!isDefined(this.state.playerSearch)}
                      style={{marginTop:"25px"}}
                      className={"btn btn-primary"}
                      onClick={this.onClickAddPlayer}>
                        <Glyphicon glyph="plus"/>
                  </Button>
                </Row>
                <div>
                    <Team team={this.state.teams[0]}/>
                </div>
              </div>
            </Form>


          </Grid>

        </div>
    )
  }
}

class Team extends Component {

    constructor(props) {
        super(props);
        this.state = {
          team : {},
          players : []
        };

    }

    // static propTypes = {
    //     team: React.PropTypes.object.isRequired
    // };


    componentWillReceiveProps(nextProps){
        this.setState({
            team: nextProps.team
        });

        if(isDefined(nextProps.team)) this.updatePlayers(nextProps.team);
        // this.forceUpdate();
    }

    updatePlayers(team) {
        if (isDefined(team)) {
            clientLink(team._links.players.href).then((entity) => {
                const players = entity._embedded.players;
                players.forEach((player) => {
                    player.id = player._links.self.href
                });
                this.setState({
                    players: players
                })
            }).catch((e) => {
                appError("Server error");
            });
        }

        this.setState({
            players: []
        })
    }

    render() {

        const style = {textAlign: 'center', minWidth: '200px'};

        if(isDefined(this.state.team)) {
            return (
                <Row>
                  <Col xs={5} md={2}>
                    <ControlLabel>{this.state.team.name}</ControlLabel>
                    <ListGroup condensed hover style={style}>
                      {
                        isDefined(this.state.players) ? this.state.players.map((player) =>
                            <ListGroupItem key={player.id} draggable="true">{player.name}</ListGroupItem>)  : <ListGroupItem/>
                      }

                    </ListGroup>
                  </Col>
                </Row>
            )
        }else {
            return (<div/>)
        }
    }
}

// class PlayerRow extends Component{
//     constructor(props){
//       super(props);
//     }
//
//     static propTypes = {
//         player: React.PropTypes.object.isRequired
//     };
//
//     render() {
//
//         return (
//             <tr key={this.props.player.id} draggable="true">
//                 {<td>{this.props.player.name}</td>}
//             </tr>
//         )
//     }
//
//
// }

