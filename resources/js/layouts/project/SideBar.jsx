import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import { Skeleton } from '@mui/material';
import * as authAPI from '../../services/auth';
import { setAuth } from './../../store/slices/user';

const items = [
  {
    href: PATH.PROJECT_PAGE,
    icon: ArrowBackIcon,
    title: 'Back',
    isHome: true,
  },
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
const ProjectSidebar = ({ onMobileClose, openMobile, projectId }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT, projectId],
    () => projectAPI.find(projectId),
  );

  const { data: auth, isSuccess } = useQuery(
    [KEY_QUERIES.FETCH_AUTH],
    authAPI.fetchAuthUser,
  );

  useEffect(() => {
    if (isSuccess && auth) {
      dispatch(setAuth(auth));
    }
  }, [data, isSuccess]);
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

export default ProjectSidebar;
