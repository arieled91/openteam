import React, { Component } from 'react';
import {
  Button,
  Checkbox, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, Grid,
  HelpBlock,
  Radio, Row
} from "react-bootstrap";

export default class Player extends Component {
  render() {
    return (
        <form>
          <Grid>
            <Row>
              <FieldGroup
                  id="formControlsText"
                  type="text"
                  label="Name"
                  placeholder="Enter text"
                  col="4"
                  required
              />
              <FieldGroup
                  id="formControlsEmail"
                  type="email"
                  label="Email address"
                  placeholder="Enter email"
                  col="4"
              />
              <FormGroup style={{paddingTop: "24px"}}>
                <Button type="submit" className="btn btn-primary">
                  Submit
                </Button>
              </FormGroup>
            </Row>
            <Checkbox>
              Team Member
            </Checkbox>
          </Grid>
        </form>

    )
  }
}

const FieldGroup = ({ id, label, help, col, ...props })=>{
  return (
      <Col xs={col}>
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