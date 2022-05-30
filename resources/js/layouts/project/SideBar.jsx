import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { PATH, PROJECT_PATH } from '../../routes/paths';
import NavItem from './NavItem';
import FilterIcon from '@mui/icons-material/Filter';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import { KEY_QUERIES } from '../../config/keyQueries';
import { useQuery } from 'react-query';
import projectAPI from '../../services/project';
import { POSITIONS } from '../../config/constants';
import SettingsIcon from '@mui/icons-material/Settings';
import { Skeleton } from '@mui/material';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
};

const items = [
  {
    href: PROJECT_PATH.OVERVIEW,
    icon: BarChartIcon,
    title: 'Overview',
  },
  {
    href: PROJECT_PATH.ISSUE,
    icon: FilterIcon,
    title: 'Issues',
  },
  {
    href: PROJECT_PATH.TRACKER,
    icon: FilterIcon,
    title: 'Trackers',
  },
  {
    href: PROJECT_PATH.MEMBER,
    icon: GroupIcon,
    title: 'Members',
  },
  {
    href: PROJECT_PATH.TARGET_VERSION,
    icon: GroupIcon,
    title: 'Target Versions',
  },
  {
    href: PROJECT_PATH.SETTING_PAGE,
    icon: SettingsIcon,
    title: 'Setting',
  },
];
const DashboardSidebar = ({ onMobileClose, openMobile, projectId }) => {
  const location = useLocation();
  const { data, isLoading, isError } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT, projectId],
    () => projectAPI.find(projectId),
  );
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
        {isLoading && (
          <Box width="100%">
            <Skeleton width="100%" height={32} />
            <Skeleton width="80%" height={32} />
          </Box>
        )}
        {data && (
          <Box>
            <Typography color="textPrimary" variant="h6">
              {data.name}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {data.customer?.name ?? 'Customer'}
            </Typography>
          </Box>
        )}
      </Box>
      <Divider />
      <List>
        {items.map((item) =>
          item.isHome ? (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ) : (
            <NavItem
              href={`${PATH.PROJECT_PAGE}/${projectId}/${item.href}`}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ),
        )}
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
