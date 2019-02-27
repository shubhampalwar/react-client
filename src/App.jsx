import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import {
  ChildrenDemo, Trainee, Login, InputDemo, TextFieldDemo,
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
          <PrivateRoute path="/children-demo" component={ChildrenDemo} />
          <PrivateRoute path="/trainee" component={Trainee} />
          <AuthRoutes path="/login" component={Login} />
          <PrivateRoute path="/input-demo" component={InputDemo} />
          <PrivateRoute path="/text-field-demo" component={TextFieldDemo} />
        </Switch>
      </MuiThemeProvider>
    </Router>

  </>
);
export default App;
