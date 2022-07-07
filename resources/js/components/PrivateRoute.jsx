import { Box } from '@mui/material';
import React from 'react';
import { useIsFetching } from 'react-query';
import { Redirect, Route } from 'react-router-dom';
import { KEY_QUERIES } from '../config/keyQueries';
import { isAuthenticated } from '../services/auth';

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? children : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
