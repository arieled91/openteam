import React from 'react';
import PropTypes from 'prop-types';
import {Button} from "react-bootstrap";
import {Route} from "react-router-dom";

export const ButtonNavigate = (props) => {

    const {to, children, ...rest} = props;
    return (
        <Route render={({ history}) => (
            <Button
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

    const {children, ...rest} = props;
    return (
        <Route render={({ history}) => (
            <ButtonNavigate
                {...rest}
                to={withoutId(history.location.pathname)}
            >
                {children}
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