/* eslint-disable no-unused-vars */
import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import {
  ChildrenDemo, Trainee, Login, InputDemo, TextFieldDemo, NoMatch,
} from './pages';
import { AuthRoutes, PrivateRoute } from './routes';
import theme from './theme';
import {
  CHILDREN_DEMO, TRAINEE, LOGIN, INPUT_DEMO, TEXT_FIELD_DEMO,
} from './configs/constants';
import { SnackBarProvider } from './contexts';

const App = () => (
  <Router>
    <SnackBarProvider>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/">
            <>
              {
                (window.localStorage.getItem('token'))
                  ? <Redirect to={TRAINEE} />
                  : <Redirect to={LOGIN} />
              }
            </>
          </Route>
          <PrivateRoute exact path={CHILDREN_DEMO} component={ChildrenDemo} />
          <PrivateRoute path={TRAINEE} component={Trainee} />
          <AuthRoutes exact path={LOGIN} component={Login} />
          <PrivateRoute exact path={INPUT_DEMO} component={InputDemo} />
          <PrivateRoute exact path={TEXT_FIELD_DEMO} component={TextFieldDemo} />
          <PrivateRoute component={NoMatch} />
        </Switch>
      </MuiThemeProvider>
    </SnackBarProvider>
  </Router>
);
export default App;
