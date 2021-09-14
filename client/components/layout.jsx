import React, { useState } from 'react';

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
      height: theme.spacing(8),
      padding: theme.spacing(2),
      backgroundColor: 'white'
    },
    topAppBar: {
      position: 'fixed',
      top: '0',
      bottom: 'auto'
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
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10)
    },
    bottomNav: {
      height: theme.spacing(8)
    },
    bottomAppBar: {
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

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [value, setValue] = useState('Home');
  const [title, setTitle] = useState(value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTitle(newValue);
  };

  const menuItems = [
    {
      label: 'Home',
      icon: <Home />,
      value: 'Home',
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
      value: 'New Post',
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
        <AppBar elevation={1} className={classes.topAppBar}>
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
        </AppBar>
      </Container>

      <div className={classes.page}>{children}</div>

      <Container maxWidth="sm">
        <AppBar className={classes.bottomAppBar}>
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
