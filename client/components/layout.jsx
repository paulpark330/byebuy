import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../lib/app-context';
import { Home, Chat, Add, Favorite, Person } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import {
  makeStyles,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  AppBar
} from '@material-ui/core';

import TopAppBar from './top-appbar';

const useStyles = makeStyles(theme => {
  return {

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
  const { route, setRoute } = useContext(AppContext);

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [value, setValue] = useState(route);

  useEffect(() => {
    setValue(route);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setRoute(newValue);
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
      <TopAppBar />

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
