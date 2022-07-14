import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAllowRoleOrPermission from '../hooks/useAllowRoleOrPermission';

const RoleAllowRoute = ({ children, roles, ...rest }) => {
  const isManager = useAllowRoleOrPermission({ roles });

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
