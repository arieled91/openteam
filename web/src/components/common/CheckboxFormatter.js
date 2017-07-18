import React, { Component } from 'react';

export default class CheckboxFormatter extends Component {
    render() {
        return (
            <input type='checkbox' checked={ this.props.active } disabled={true}/>
        );
    }
}