import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../store/slices/user';

export default function useAllowRoleOrPermission({
  roles = [],
  permissions = [],
}) {
  const auth = useSelector(selectAuth);
  const allow = useMemo(() => {
    return (
      auth?.roles?.some((role) => roles.includes(role.id)) ||
      auth?.permissions?.some((permission) =>
        permissions.includes(permission.id),
      ) ||
      auth?.roles?.some((role) =>
        role.permissions
          .reduce((totalPermission, p) => [...totalPermission, p.id], [])
          ?.some((p) => permissions.includes(p)),
      )
    );
  }, [auth]);

  return allow;
}
