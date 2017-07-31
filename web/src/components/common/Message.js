import React from 'react';
import {Alert} from "react-bootstrap";
import {isDefined, isDefinedString} from "../../common/Util";

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


const style = {
  position: 'absolute',
  top: '30px',
  zIndex: 100,
  left: '50%',
  transform: 'translate(-50%, 0)',
  whiteSpace: 'nowrap'
};

//this is a hack to throw errors inside a catch clause
export function appError(msg, e) {
  if(isDefined(e)) console.log(e);
  setTimeout(()=>{ throw msg; });
}

