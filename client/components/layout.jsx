import React from 'react';
import {
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return {
    page: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10)
    }
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.page}>{children}</div>
    </div>
  );
}
