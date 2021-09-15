import React, { useContext } from 'react';
import AppContext from '../lib/app-context';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack, Search } from '@material-ui/icons/';
import { useHistory } from 'react-router-dom';
import { Typography, IconButton, AppBar, Toolbar } from '@material-ui/core';

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
  const { pageTitle } = useContext(AppContext);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} elevation={1} position="fixed">
        <Toolbar>
          <Typography variant="h5" component="h1" className={classes.title}>
            {pageTitle}
          </Typography>
          <div>
            {pageTitle === 'Home' && (
              <IconButton onClick={() => history.push('/search')}>
                <Search className={classes.icon} />
              </IconButton>
            )}
            {pageTitle === 'Search' && (
              <IconButton onClick={() => history.push('/')}>
                <ArrowBack className={classes.icon} />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
