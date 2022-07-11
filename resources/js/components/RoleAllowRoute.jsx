import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuthRole from '../hooks/useAuthRole';

const RoleAllowRoute = ({ children, roles, ...rest }) => {
  const isManager = useAuthRole({ roles });

  return (
    <Route
      {...rest}
      render={() =>
        isManager ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { notAllowToast: true },
            }}
          />
        )
      }
    />
  );
};

export default RoleAllowRoute;
