import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Trainee, Login } from './pages';
import theme from './theme';

const App = () => (
  <>
    <MuiThemeProvider theme={theme}>
      {/* <Trainee /> */}
      <Login />
    </MuiThemeProvider>
  </>
);
export default App;
