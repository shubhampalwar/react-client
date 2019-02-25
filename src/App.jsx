import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { ChildrenDemo } from './pages';
import theme from './theme';

const App = () => (
  <>
    <MuiThemeProvider theme={theme}>
      <ChildrenDemo />
    </MuiThemeProvider>
  </>
);
export default App;
