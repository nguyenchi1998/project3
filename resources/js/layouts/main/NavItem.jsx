import React from 'react';
import {
  matchPath,
  NavLink as RouterLink,
  useLocation,
} from 'react-router-dom';
import { Box, Button, ListItem } from '@mui/material';

const NavItem = ({ href, icon: Icon, title, ...rest }) => {
  const location = useLocation();
  const active = location.pathname.split('/')[1] === href.split('/')[1];

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0,
        ...(active && {
          backgroundColor: '#5664D2',
        }),
      }}
      {...rest}
    >
      <Button
        component={RouterLink}
        sx={{
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          ...(active && {
            color: 'white',
          }),
          '& svg': {
            mr: 1,
          },
        }}
        to={href}
      >
        <Box px={2} display="flex">
          {Icon && <Icon size="20" />}
          <span>{title}</span>
        </Box>
      </Button>
    </ListItem>
  );
};

export default NavItem;
