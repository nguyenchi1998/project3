import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (isAuthenticated() ? children : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
