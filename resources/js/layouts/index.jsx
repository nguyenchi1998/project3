import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import DashboardSidebar from './SideBar';
import {PATH} from '../routes/paths';
import DashboardPage from '../pages/DashboardPage';
import ProjectPage from '../pages/ProjectPage';
import DetailProjectPage from '../pages/DetailProjectPage';
import DashboardNavbar from './Navbar';

const DashboardLayoutRoot = styled('div')(({theme}) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  //   overflow: 'hidden',
  width: '100%',
}));

const DashboardLayoutWrapper = styled('div')(({theme}) => ({
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
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)}/>
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Switch>
              <Route path={`${PATH.PROJECT_PAGE}/:projectId`} exact>
                <DetailProjectPage/>
              </Route>
              <Route path={PATH.PROJECT_PAGE} exact>
                <ProjectPage/>
              </Route>
              <Route path={PATH.HOME_PAGE}>
                <DashboardPage/>
              </Route>
            </Switch>
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default ManagerLayout;
