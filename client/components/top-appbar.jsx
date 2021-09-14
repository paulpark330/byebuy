import React, { useContext } from 'react';
import AppContext from '../lib/app-context';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack, Search } from '@material-ui/icons/';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  TextField,
  InputAdornment
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    height: theme.spacing(8),
    justifyContent: 'center'
  },
  title: {
    flexGrow: 1,
    color: 'white',
    marginRight: theme.spacing(2)
  },
  icon: {
    fontSize: 30,
    color: 'white'
  },
  closeIcon: {
    fontSize: 30,
    color: 'red'
  },
  search: {
    display: 'flex',
    alignItems: 'center'
  },
  field: {
    color: 'white'
  }
}));

export default function TopAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const { route } = useContext(AppContext);

  const handleSubmit = e => {
    e.preventDefault();
    const newSearch = new FormData(event.target);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} elevation={1} position="fixed">
        <Toolbar>
          <Typography variant="h5" component="h1" className={classes.title}>
            {route}
          </Typography>
          <div>
            {(route === 'Home' || route === 'Favorites') && (
              <IconButton onClick={() => history.push('/search')}>
                <Search className={classes.icon} />
              </IconButton>
            )}
            {route === 'Search' && (
              <div className={classes.search}>
                <form
                  id="search-form"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <TextField
                    className={classes.field}
                    label="Search"
                    name="search"
                    size='small'
                    variant="filled"
                    type="search"
                    color="secondary"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search className={classes.icon}/>
                        </InputAdornment>
                      )
                    }}
                  />
                </form>
                <IconButton onClick={() => history.goBack()}>
                  <ArrowBack className={classes.icon} />
                </IconButton>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
