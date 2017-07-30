import React from 'react';
import {
  Col,
  ControlLabel, FormControl, FormGroup, Glyphicon,
  HelpBlock
} from "react-bootstrap";
import Autosuggest from 'react-bootstrap-autosuggest'

export const FieldGroup = ({ id, label, help, colxs, colmd, ...props })=>{
  const hideAutoFillColorStyle = {
    WebkitBoxShadow: '0 0 0 1000px white inset'
  };

  return (
      <Col xs={colxs} md={colmd}>
        <FormGroup controlId={id} validationState={props.validationState}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} style={hideAutoFillColorStyle}/>
          <FormControl.Feedback >
            {props.required ? <text style={{fontWeight: 'bold'}}>*</text> : ""}
          </FormControl.Feedback>
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      </Col>
  );
};

export const SearchBox = ({...props })=>{
  const hideAutoFillColorStyle = {
    WebkitBoxShadow: '0 0 0 1000px white inset'
  };

  return (
      <Col xs={props.colxs} md={props.colmd}>
        <FormGroup controlId={props.id}
                   bsSize={props.bsSize} validationState={props.validationState}>
          <ControlLabel>{props.label}</ControlLabel>
          <Autosuggest
              datalist={props.suggestions}
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.onChange}
              bsSize={props.bsSize}
              {...props}
          />
          {props.validationState && <FormControl.Feedback />}
          {props.validationState && <HelpBlock>{props.help}</HelpBlock>}
        </FormGroup>
      </Col>
  );
};
