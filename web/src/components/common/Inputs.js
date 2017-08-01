import React from 'react';
import {
  Col,
  ControlLabel, FormControl, FormGroup, HelpBlock
} from "react-bootstrap";
import Autosuggest from 'react-bootstrap-autosuggest'
import PropTypes from 'prop-types';

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

export const SearchBox = (props)=>{
const { id,colxs, colmd, placeholder, suggestions,value,onChange,bsSize,label, validationState, help,...rest} = props;
  return (
      <Col xs={colxs} md={colmd}>
        <FormGroup controlId={id}
                   bsSize={bsSize} validationState={validationState}>
          <ControlLabel>{label}</ControlLabel>
          <Autosuggest
              valueIsItem
              datalist={suggestions}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              bsSize={bsSize}
              {...rest}
          />
          {validationState && <FormControl.Feedback />}
          {validationState && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      </Col>
  );
};


SearchBox.propTypes = {
    colxs: PropTypes.number,
    colmd: PropTypes.number
};
