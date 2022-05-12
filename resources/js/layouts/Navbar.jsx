import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import InputIcon from '@mui/icons-material/Input';
import Logo from './Logo';
import { AUTH_PATH } from '../routes/paths';
import { signOut } from '../services/auth';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const history = useHistory();

  const handleLogout = () => {
    signOut().then(() => history.push(AUTH_PATH.SIGN_IN_PAGE));
  };

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box pl={2}>
          <Typography variant="h5">Data Warehouse</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden mdDown>
          <IconButton color="inherit" size="large">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" size="large" onClick={handleLogout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
