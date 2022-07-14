import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAllowRoleOrPermission from '../hooks/useAllowRoleOrPermission';
import ForbiddenPage from '../pages/Error/ForbiddenPage';

const RoleAllowRoute = ({ children, roles, ...rest }) => {
  const isManager = useAllowRoleOrPermission({ roles });

  return (
    <Route
      {...rest}
      render={() => (isManager ? children : <ForbiddenPage />)}
    />
  );
};

export default RoleAllowRoute;
