import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../lib/app-context';
import { Home, Chat, Add, Favorite, Person } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
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
    }
  };
});

export default function Layout({ children }) {
  const { pageTitle, setPageTitle } = useContext(AppContext);

  const classes = useStyles();

  const history = useHistory();

  const [value, setValue] = useState(pageTitle);

  useEffect(() => {
    setValue(pageTitle);
  }, [pageTitle]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPageTitle(newValue);
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

      {pageTitle !== 'Details' && (
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
                />
              ))}
            </BottomNavigation>
          </AppBar>
        </Container>
      )}
    </div>
  );
}
