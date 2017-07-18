import React, { Component } from 'react';
import {Alert} from "react-bootstrap";

export const Message = ({...props})=>{

  if (isDefinedString(props.message)) {
    return (
        <Alert bsStyle={props.type} onDismiss={props.onDismiss} style={style}>
          <p style={{textAlign: 'center'}}>{props.message}</p>
        </Alert>
    );
  }

  return (<div/>);

};

function isDefinedString(s) {
  return s && typeof s === 'string'
}

const style = {
  position: 'absolute',
  top: '30px',
  zIndex: 100,
  left: '50%',
  transform: 'translate(-50%, 0)',
  whiteSpace: 'nowrap'
};