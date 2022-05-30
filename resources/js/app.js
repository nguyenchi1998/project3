import React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';
import theme from '../js/styles/theme';
import store from '../js/store';
import LoadingIndicator from '../js/components/LoadingIndicator';
import GlobalStyles from '../js/styles/global';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AUTH_PATH, ERROR_PATH, PATH } from './routes/paths';
import LoginPage from '../js/pages/Auth/Login';
import NotFoundPage from '../js/pages/Error/NotFoundPage';
import InternalErrorPage from '../js/pages/Error/InternalErrorPage';
import PrivateRoute from './components/PrivateRoute';
import 'react-toastify/dist/ReactToastify.css';
import ManagerLayout from './layouts/main';
import ProjectLayout from './layouts/project';

const queryClient = new QueryClient({
  defaultOptions: { refetchOnWindowFocus: false, refetchOnMount: false },
});
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <HelmetProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <React.Suspense fallback={<LoadingIndicator />}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Router>
                  <Switch>
                    <Route path={AUTH_PATH.SIGN_IN_PAGE}>
                      <LoginPage />
                    </Route>
                    <Route path={ERROR_PATH.INTERNAL_ERROR_PAGE}>
                      <InternalErrorPage />
                    </Route>
                    <Route path={ERROR_PATH.NOT_FOUND_PAGE}>
                      <NotFoundPage />
                    </Route>
                    <PrivateRoute path={`${PATH.PROJECT_PAGE}/:projectId`}>
                      <ProjectLayout />
                    </PrivateRoute>
                    <PrivateRoute path={PATH.HOME_PAGE}>
                      <ManagerLayout />
                    </PrivateRoute>
                    <Route path="*">
                      <NotFoundPage />
                    </Route>
                  </Switch>
                </Router>
                <ToastContainer theme="colored" />
              </LocalizationProvider>
            </React.Suspense>
          </ThemeProvider>
        </StyledEngineProvider>
      </HelmetProvider>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById('root'),
);
