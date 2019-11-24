import React from 'react';
import LandingPage from './containers/landingpage/LandingPage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import LoginPage from './containers/loginpage/Login';
import FixuresPage from './containers/fixurespage/FixuresPage';
import DepartmentPage from './components/departments/Department';
import ReportView from './components/reportview/ReportView';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

 

const theme = createMuiTheme({
  shadows: Array(25).fill('none'),
  palette: {
    primary: {
      main: grey[700]
    },
    secondary: {
      main: red[700]
    }
  },
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
});


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.PUBLIC_URL+'/matalan-inventory'}>
        <Switch>
          <Route path='/' exact component={LoginPage} />
          <Route path='/login' exact component={LoginPage} />
          <Route path='/divisions' exact component={LandingPage} />
          <Route path='/department' exact component={DepartmentPage} />
          <Route path='/fixures' exact component={FixuresPage} />
          <Route path='/reportview' exact component={ReportView} />
        </Switch>
      </BrowserRouter>
</MuiThemeProvider>
  );
}

export default App;
