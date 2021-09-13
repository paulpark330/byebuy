import React, { useEffect, useState } from 'react';
import { Close, Home, Chat, Add, Favorite, Person } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import {
  makeStyles,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  AppBar,
  Typography,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return {
    header: {
      width: '100%',
      height: theme.spacing(8)
    },
    title: {
      fontSize: 30,
      fontWeight: 700
    },
    closeIcon: {
      color: 'red',
      fontSize: 30
    },
    page: {
      padding: theme.spacing(2)
    },
    bottomNav: {
      height: theme.spacing(8)
    },
    appBar: {
      position: 'fixed',
      top: 'auto',
      bottom: '0'
    },
    active: {
      backgroundColor: '#EEEEEE'
    }
  };

});

export default function Layout({ children }) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const KEY = 'AIzaSyDmADdAoHWHYXYsnAe1YAVaPgnlR6Fohow';
      let address = '';
      fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${KEY}`
      )
        .then(res => res.json())
        .then(result => {
          address = result.results[6].formatted_address;
          setGeoLocation(address);
          setTitle(address);
        });
    });
  }, []);

  const classes = useStyles();
  const [value, setValue] = useState('Home');
  const [geoLocation, setGeoLocation] = useState('');
  const [title, setTitle] = useState(value);
  const location = useLocation();
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTitle(newValue);
  };

  const menuItems = [
    {
      label: 'Home',
      icon: <Home />,
      value: geoLocation,
      path: '/'
    },
    {
      label: 'Chat',
      icon: <Chat />,
      value: 'Chat',
      path: '/chat'
    },
    {
      label: 'New',
      icon: <Add />,
      value: 'New post',
      path: '/new-post'
    },
    {
      label: 'Favorites',
      icon: <Favorite />,
      value: 'Favorites',
      path: '/favorites'
    },
    {
      label: 'Profile',
      icon: <Person />,
      value: 'Profile',
      path: '/profile'
    }
  ];

  return (
    <div>
      <Container maxWidth="sm">
        <Grid container className={classes.header}>
          <Grid
            item
            xs={6}
            container
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography variant="h1" className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <Close className={classes.closeIcon} />
          </Grid>
        </Grid>
      </Container>

      <div className={classes.page}>{children}</div>

      <Container maxWidth="sm">
        <AppBar className={classes.appBar}>
          <BottomNavigation
            value={value}
            onChange={handleChange}
            className={classes.bottomNav}
          >
            {menuItems.map(item => (
              <BottomNavigationAction
                key={item.label}
                label={item.label}
                value={item.value}
                icon={item.icon}
                onClick={() => history.push(item.path)}
                className={
                  location.pathname === item.path ? classes.active : null
                }

              />
            ))}
          </BottomNavigation>
        </AppBar>
      </Container>
    </div>
  );
}
