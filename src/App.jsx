import { Suspense, lazy } from 'react';
import { Backdrop, CircularProgress, Container } from '@material-ui/core';
import { Redirect, Router, Switch, Route } from 'react-router-dom';
import { history } from 'shared/constants/history';

import { FilmsPage } from 'features/films/components/FilmsPage';

import 'models/init';

import styles from './App.module.css';

const ReviewPage = lazy(() => import('features/review/components/ReviewPage'));

export const Routes = () => (
  <Suspense
    fallback={
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    }
  >
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/films" />} />
      <Route path="/films" component={FilmsPage} />
      <Route exact path="/review/:title" component={ReviewPage} />
    </Switch>
  </Suspense>
);

export const App = () => (
  <Container
    classes={{
      root: styles.container,
    }}
  >
    <Router history={history}>
      <Routes />
    </Router>
  </Container>
);
