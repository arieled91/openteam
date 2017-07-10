'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {events: []};
	}

	componentDidMount() {
        console.log("1");
		client({method: 'GET', path: '/api/events'}).done(response => {
            console.log("2");
            this.setState({events: response.entity._embedded.events});
		});
	}

	render() {
		return (
		    <div>
                <h1>App</h1>
			    <EventList events={this.state.events}/>
            </div>
		)
	}
}

class EventList extends React.Component{
	render() {
		let events = this.props.events.map(event =>
			<Event key={event._links.self.href} event={event}/>
        );
		return (
			<table>
				<tbody>
					<tr>
						<th>Name</th>
						{/*<th>Last Name</th>*/}
						<th>Date</th>
					</tr>
					{events}
				</tbody>
			</table>
		)
	}
}

class Event extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.event.name}</td>
				{/*<td>{this.props.event.lastName}</td>*/}
				<td>{this.props.event.dateTime}</td>
			</tr>
		)
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('react')
);
// end::render[]

