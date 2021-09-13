import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Close } from '@material-ui/icons';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 80
  },
  heading: {
    fontSize: 30,
    fontWeight: 700
  },
  closeIcon: {
    color: 'red',
    fontSize: 30
  }
});

export default function Header() {
  const classes = useStyles();
  const [heading] = React.useState('New Post');

  return (
    <Container maxWidth="xs">
      <Grid container className={classes.root}>
        <Grid
          item
          xs={6}
          container
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography variant="h1" className={classes.heading}>
            {heading}
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
  );
}
