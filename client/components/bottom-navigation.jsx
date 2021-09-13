import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  AppBar,
  makeStyles
} from '@material-ui/core';
import { Home, Chat, Add, Favorite, Person } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    height: 60
  },
  appBar: {
    position: 'fixed',
    top: 'auto',
    bottom: '0'
  }
});

export default function BottomNavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xs">
      <AppBar className={classes.appBar}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          className={classes.root}
        >
          <BottomNavigationAction label="Home" value="home" icon={<Home />} />
          <BottomNavigationAction label="Chat" value="chat" icon={<Chat />} />
          <BottomNavigationAction label="New" value="new" icon={<Add />} />
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
      </AppBar>
    </Container>
  );
}
