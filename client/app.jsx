import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import Chat from './pages/chat';
import NewPost from './pages/new-post';
import Favorites from './pages/favorites';
import Profile from './pages/profile';
import Details from './pages/details';
import Search from './pages/search';
import Auth from './pages/auth';
import decodeToken from './lib/decode-token';

import TopAppBar from './components/top-appbar';
import Page from './components/page';
import BottomNavBar from './components/bottom-navbar';

import { createTheme, ThemeProvider } from '@material-ui/core';

import AppContext from './lib/app-context';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6EB289',
      light: '#FFF'
    },
    secondary: {
      main: '#FFF'
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
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [geoLocation, setGeoLocation] = useState('');
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=postal_code&key=${process.env.GEOCODE}`
      )
        .then(res => res.json())
        .then(result => {
          setGeoLocation(result.results[0].address_components[1].long_name);
        });
    });
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    if (user) {
      setUsername(user.nickname);
      setUserId(user.userId);
    }
  }, []);

  const handleSignIn = result => {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    setUsername(user);
  };

  const handleSignOut = () => {
    window.localStorage.removeItem('react-context-jwt');
    setUsername(null);
  };

  const contextValue = {
    username,
    userId,
    geoLocation,
    setPageTitle,
    pageTitle,
    handleSignIn,
    handleSignOut
  };
  const renderPage = () => {
    return (
      <div>
        {username
          ? (
          <div>
            <Route exact path="/">
              <TopAppBar />
              <Home />
              <BottomNavBar />
            </Route>
            <Route path="/new-post">
              <TopAppBar />
              <NewPost />
              <BottomNavBar />
            </Route>
            <Route path="/chat">
              <TopAppBar />
              <Chat />
              <BottomNavBar />
            </Route>
            <Route path="/favorites">
              <TopAppBar />
              <Favorites />
              <BottomNavBar />
            </Route>
            <Route path="/profile">
              <TopAppBar />
              <Profile />
              <BottomNavBar />
            </Route>
            <Route path="/search">
              <TopAppBar />
              <Search />
            </Route>
            <Route path="/post">
              <Details />
            </Route>
          </div>
            )
          : (
          <Route path="/auth">
            <Auth />
          </Route>
            )}
      </div>
    );
  };

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Page>{renderPage()}</Page>
          </Switch>
        </Router>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
