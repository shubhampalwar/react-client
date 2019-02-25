import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Trainee } from './pages';
import theme from './theme';

const App = () => (
  <>
    <MuiThemeProvider theme={theme}>
      <Trainee />
    </MuiThemeProvider>
  </>
);
export default App;
