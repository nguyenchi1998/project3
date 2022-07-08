import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import DashboardSidebar from './SideBar';
import { PATH } from '../../routes/paths';
import DashboardPage from '../../pages/DashboardPage';
import ProjectPage from '../../pages/ProjectPage';
import DashboardNavbar from './Navbar';
import EmployeePage from '../../pages/EmployeePage';
import RolePage from '../../pages/RolePage';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import * as authAPI from '../../services/auth';
import { useDispatch } from 'react-redux';
import { setAuth } from './../../store/slices/user';
import LoadingIndicator from './../../components/LoadingIndicator';
import { Box } from '@mui/material';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  //   overflow: 'hidden',
  width: '100%',
}));

const DashboardLayoutWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('md')]: {
    paddingLeft: 256,
  },
}));

const DashboardLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
});

const DashboardLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
});

const ManagerLayout = () => {
  const dispatch = useDispatch();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { data, isSuccess, isLoading } = useQuery(
    [KEY_QUERIES.FETCH_AUTH],
    authAPI.fetchAuthUser,
    { refetchOnWindowFocus: false },
  );
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setAuth(data));
    }
  }, [data, isSuccess]);
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" height={'100%'}>
        <LoadingIndicator />
      </Box>
    );
  }

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Switch>
              <Route path={PATH.ROLE_PAGE} exact>
                <RolePage />
              </Route>
              <Route path={PATH.EMPLOYEE_PAGE} exact>
                <EmployeePage />
              </Route>
              <Route path={PATH.PROJECT_PAGE} exact>
                <ProjectPage />
              </Route>
              <Route path={PATH.HOME_PAGE}>
                <DashboardPage />
              </Route>
            </Switch>
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default ManagerLayout;
