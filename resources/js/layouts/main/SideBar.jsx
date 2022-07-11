import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { PATH } from '../../routes/paths';
import NavItem from './NavItem';
import FilterIcon from '@mui/icons-material/Filter';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GroupIcon from '@mui/icons-material/Group';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/slices/user';
import useAuthRole from '../../hooks/useAuthRole';
import { MANAGER_ROLE } from '../../config/constants';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
};

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const isManager = useAuthRole({ roles: MANAGER_ROLE });
  const items = [
    {
      href: PATH.HOME_PAGE,
      icon: BarChartIcon,
      title: 'Dashboard',
      show: true,
    },
    {
      href: PATH.PROJECT_PAGE,
      icon: FilterIcon,
      title: 'Project',
      show: true,
    },
    {
      href: PATH.EMPLOYEE_PAGE,
      icon: GroupIcon,
      title: 'Employee',
      show: true,
    },
    {
      href: PATH.ROLE_PAGE,
      icon: AssignmentIndIcon,
      title: 'Role',
      show: isManager,
    },
    {
      href: PATH.POSITION_PAGE,
      icon: AssignmentIndIcon,
      title: 'Position',
      show: true,
    },
  ];

  const location = useLocation();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 56,
            height: 56,
          }}
          to="/app/account"
        />
        {auth && (
          <Box>
            <Typography color="textPrimary" variant="h6">
              {auth?.name}
            </Typography>
            {auth?.group && (
              <Typography
                color="textSecondary"
                variant="body1"
                textAlign="center"
              >
                {auth.group.division.name} - {auth.group.name}
              </Typography>
            )}
            {auth?.position && (
              <Typography
                color="textSecondary"
                variant="body1"
                textAlign="center"
              >
                {auth?.position?.name}
              </Typography>
            )}
          </Box>
        )}
      </Box>
      <Divider />
      <List>
        {items
          .filter(({ show }) => show)
          .map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)',
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default DashboardSidebar;
