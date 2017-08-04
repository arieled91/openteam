import React from 'react';
import PropTypes from 'prop-types';
import {Button, Glyphicon} from "react-bootstrap";
import {Route} from "react-router-dom";
import {button} from "../locale/CommonLocale";

const buttonMargin={
  marginRight: '10px',
  marginLeft: '10px'
};

export const ButtonNavigate = (props) => {

    const {to, children, ...rest} = props;
    return (
        <Route render={({ history}) => (
            <Button
                style={buttonMargin}
                {...rest}
                onClick={() => {history.push(to); history.go()}}
            >
                {children}
            </Button>
        )} />
)};

ButtonNavigate.propTypes = {
    to: PropTypes.string.isRequired
};

export const ButtonCancel = (props) => {

    const {...rest} = props;
    return (
        <Route render={({ history}) => (
            <ButtonNavigate
                {...rest}
                to={withoutId(history.location.pathname)}
            >
              {button.cancel}
            </ButtonNavigate>
        )} />
)};


function withoutId(path) {
    const splitedPath = path.split("/");
    if(splitedPath.length>2) {
        splitedPath.pop();
        return splitedPath.join('/');
    }
    return path;
}
export const ButtonSave = () => {
  return(
    <Button type="submit" className={"btn btn-success"}
            style={buttonMargin}>
      <Glyphicon glyph="floppy-disk" style={{marginRight: '5px'}}/>
      {button.save}
    </Button>
  )
};