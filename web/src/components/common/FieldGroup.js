import React from 'react';
import {
  Col,
  ControlLabel, FormControl, FormGroup, Glyphicon,
  HelpBlock
} from "react-bootstrap";

export const FieldGroup = ({ id, label, help, colxs, colmd, ...props })=>{
  return (
      <Col xs={colxs} md={colmd}>
        <FormGroup controlId={id} validationState={props.validationState}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
          <FormControl.Feedback >
            {props.required ? <Glyphicon glyph="asterisk" /> : ""}
          </FormControl.Feedback>
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      </Col>
  );
};
