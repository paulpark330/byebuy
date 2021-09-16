import React, { useEffect, useContext } from 'react';
import AppContext from '../lib/app-context';
import AuthForm from '../components/auth-form';
import { Container, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return {
    background: {
      backgroundImage: 'url(/images//subtle-prism.svg)',
      position: 'fixed',
      top: 0,
      left: 0,
      minWidth: '100%',
      minHeight: '100%'
    },
    logo: {
      color: theme.palette.primary.light,
      fontWeight: 500,
      position: 'relative',
      textAlign: 'center'
    },
    text: {
      color: theme.palette.primary.light,
      fontWeight: 300,
      position: 'relative',
      textAlign: 'center',
      marginTop: theme.spacing(4)
    },
    signup: {
      fontWeight: 500
    }
  };
});

export default function Auth() {
  const { setPageTitle } = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    setPageTitle('Auth');
  }, []);

  return (
    <div>
      <Container>
        <div className={classes.background}></div>
        <Typography variant="h1" className={classes.logo} gutterBottom>
          byebuy
        </Typography>
        <AuthForm />
        <Typography variant="body1" className={classes.text}>
          Haven an Account? |{' '}
          <span className={classes.signup}>Sign in</span>
        </Typography>
      </Container>
    </div>
  );
}
