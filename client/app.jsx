import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import NewPost from './pages/new-post';
import Chat from './pages/chat';
import Favorites from './pages/favorites';
import Profile from './pages/profile';
import { createTheme, ThemeProvider } from '@material-ui/core';

import AppContext from './lib/app-context';
import Layout from './components/layout';

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
  const [geoLocation, setGeoLocation] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      let address = '';
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GEOCODE}`
      )
        .then(res => res.json())
        .then(result => {
          address = result.results[0].address_components[3].long_name;
          setGeoLocation(address);
        });
    });
  }, []);

  const contextValue = { userId, geoLocation };

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/new-post">
                <NewPost />
              </Route>
              <Route path="/chat">
                <Chat />
              </Route>
              <Route path="/favorites">
                <Favorites />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
