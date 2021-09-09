import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  makeStyles
} from '@material-ui/core';
import { Home, Chat, Add, Favorite, Person } from '@material-ui/icons';

const useStyles = makeStyles({
  bottomNavBar: {
    color: '#6EB289'
  },
  root: {
    width: 500
  }
});

export default function BottomNavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth='sm'>
      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<Home />}

        />
        <BottomNavigationAction
          label="Chat"
          value="chat"
          icon={<Chat />}

        />
        <BottomNavigationAction
          label="New"
          value="new"
          icon={<Add />}

        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<Favorite />}

        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<Person />}

        />
      </BottomNavigation>
    </Container>
  );
}
