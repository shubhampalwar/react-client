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

const App = () => (
  <>
    <Router>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
          <PrivateRoute path="/trainee" component={Trainee} />
          <AuthRoutes exact path="/login" component={Login} />
          <PrivateRoute exact path="/input-demo" component={InputDemo} />
          <PrivateRoute exact path="/text-field-demo" component={TextFieldDemo} />
          <PrivateRoute component={NoMatch} />
        </Switch>
      </MuiThemeProvider>
    </Router>

  </>
);
export default App;
