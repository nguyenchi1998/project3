import React, { useState } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ProjectSidebar from './SideBar';
import { PATH, PROJECT_PATH } from '../../routes/paths';
import OverviewProjectPage from '../../pages/OverviewProjectPage';
import ProjectNavbar from './Navbar';
import DetailIssuePage from '../../pages/DetailIssuePage';
import IssuesProjectPage from '../../pages/IssuesProjectPage';
import TrackerPage from '../../pages/TrackerPage';
import MemberProjectPage from '../../pages/MemberProjectPage';
import TargetVerionPage from '../../pages/TargetVersionPage';

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

const ProjectLayout = () => {
  const { projectId } = useParams();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <DashboardLayoutRoot>
      <ProjectNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <ProjectSidebar
        projectId={projectId}
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Switch>
              <Route
                path={`${PATH.PROJECT_PAGE}/:projectId/${PROJECT_PATH.ISSUE}/:issueId`}
              >
                <DetailIssuePage />
              </Route>
              <Route
                path={`${PATH.PROJECT_PAGE}/:projectId/${PROJECT_PATH.ISSUE}`}
                exact
              >
                <IssuesProjectPage />
              </Route>
              <Route
                path={`${PATH.PROJECT_PAGE}/:projectId/${PROJECT_PATH.OVERVIEW}`}
                exact
              >
                <OverviewProjectPage />
              </Route>
              <Route
                path={`${PATH.PROJECT_PAGE}/:projectId/${PROJECT_PATH.TRACKER}`}
                exact
              >
                <TrackerPage />
              </Route>
              <Route
                path={`${PATH.PROJECT_PAGE}/:projectId/${PROJECT_PATH.MEMBER}`}
                exact
              >
                <MemberProjectPage projectId={projectId} />
              </Route>
              <Route
                path={`${PATH.PROJECT_PAGE}/:projectId/${PROJECT_PATH.TARGET_VERSION}`}
                exact
              >
                <TargetVerionPage projectId={projectId} />
              </Route>
            </Switch>
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default ProjectLayout;
