import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import NewPost from './pages/new-post';
import BottomNavBar from './components/bottom-navigation';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { lightGreen } from '@material-ui/core/colors';
// import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6EB289'
    },
    secondary: lightGreen
  },
  typography: {
    fontFamily: 'Roboto',
    fontWeightThin: 100,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontWeightBlack: 900
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new-post">
            <NewPost />
          </Route>
        </Switch>
        <BottomNavBar />
      </Router>
    </ThemeProvider>
  );
}

export default App;
