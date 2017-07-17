import React from 'react';
import {
  Col,
  ControlLabel, FormControl, FormGroup, Glyphicon,
  HelpBlock
} from "react-bootstrap";

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
            {props.required ? <Glyphicon glyph="asterisk" /> : ""}
          </FormControl.Feedback>
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      </Col>
  );
};
