import React, { Component } from 'react';

import {
    Form, Grid, Row, Table
} from "react-bootstrap";

import {FieldGroup} from "./common/FieldGroup";
import {client, clientLink, clientPatch, clientPost} from "./common/Api";
import {appError} from "./common/Message";
import {isDefined} from "../common/Util";

export default class Event extends Component {


  constructor(props){
    super(props);
    this.state = {
      id : props.match.params.id,
      event : {},
      teams : [],

      eventName : "",
      eventDate : "",
      editMode : false
    };


    this.onSubmit = this.onSubmit.bind(this);
    this.reset = this.reset.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
  }
  componentWillMount(){
      this.populate();
  }

  populate(){
      if(isDefined(this.state.id)) {
          client("events/" + this.state.id).then((entity) => {
              clientLink(entity._links.teams.href).then((teamsResponse) => {
                  this.setState({
                      event: entity,
                      eventName: entity.name,
                      eventDate: entity.dateTime,
                      teams: teamsResponse._embedded.teams
                  });
              });
          }).catch((e) => {
              appError("Server error");
          });
      }
  }

  post(entity){
    // clientPost("players", entity).then(() => {
    //   this.populate();
    // }).catch((e)=>{
    //   appError("Server error");
    // })
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
    // this.post(this.copyTo({}));
  }

  copyTo(player){
    // player.name = this.state.playerName;
    // player.email = this.state.playerEmail;
    // player.guest = this.state.playerGuest;
    // return player;
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


  eventNameChanged = (event) => {
    this.setState({ eventName: event.target.value });
  };

  eventDateChanged = (event) => {
    this.setState({ eventDate: event.target.value });
  };



  render() {
    return (
        <div>
          <Grid>
            <Form onSubmit={this.onSubmit}>
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
                    placeholder="Enter Date"
                    value={this.state.eventDate}
                    onChange={this.eventDateChanged}
                    inputRef={input => this.eventDate = input}
                    colxs={7}
                    colmd={4}
                    required
                />
              </Row>

              {/*<div id="caja1" draggable="true" onDragStart={this.onDragStart()}> <span>Caja 1</span></div>*/}
              {/*<div id="caja2" draggable="true" onDragStart={this.onDragStart()}> <span>Caja 2</span></div>*/}
              {/*<div id="contenedor" onDrop={this.onDrop()} onDragEnter={this.onDragEnter()} onDragOver={this.onDragOver()} > <span>Contenedor</span></div>*/}

              <div style={{width: '200px'}}>
                  <Team team={this.state.teams[0]}/>
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

        const center = {textAlign: 'center'};

        if(isDefined(this.state.team)) {
            return (
                <div>
                    <Table condensed hover  style={center}>
                        <thead>
                        <tr>
                            <th>{this.state.team.name}</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                isDefined(this.state.players) ? this.state.players.map((player) =>
                                <PlayerRow key={player.id}  player={player}/>)  : <tr/>
                            }
                        </tbody>
                    </Table>
                </div>
            )
        }else {
            return (<div>Loading...</div>)
        }
    }
}

class PlayerRow extends Component{
    constructor(props){
      super(props);
    }

    static propTypes = {
        player: React.PropTypes.object.isRequired
    };

    render() {

        return (
            <tr key={this.props.player.id} draggable="true">
                {<td>{this.props.player.name}</td>}
            </tr>
        )
    }


}

