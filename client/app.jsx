import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import NewPost from './pages/new-post';
import BottomNavBar from './components/bottom-navigation';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Header from './components/header';
import AppContext from './lib/app-context';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6EB289'
    },
    secondary: {
      main: '#427d5a'
    }
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
  const [userId] = useState(0);

  return (
    <AppContext.Provider value={userId}>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
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
    </AppContext.Provider>
  );
}

export default App;
