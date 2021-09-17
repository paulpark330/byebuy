import React, { useState } from 'react';
import AuthForm from '../components/auth-form';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
      position: 'absolute',
      bottom: theme.spacing(6),
      left: 0,
      right: 0,
      textAlign: 'center'
    },
    signup: {
      fontWeight: 500
    }
  };
});

export default function Auth() {
  const classes = useStyles();
  const [route, setRoute] = useState(window.location.pathname);

  const handleClick = () => {
    if (route === '/auth/sign-up') {
      setRoute('/auth/sign-in');
    } else {
      setRoute('/auth/sign-up');
    }
  };

  const renderWelcome = () => {
    return (
      <div>
        {route === '/auth/sign-up'
          ? (
          <Typography variant="body1" className={classes.text}>
            Have an Account? |{' '}
            <Link
              to={'/auth/sign-in'}
              style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 700
              }}
              className={classes.signup}
              onClick={handleClick}
            >
              Sign in
            </Link>
          </Typography>
            )
          : (
          <Typography variant="body1" className={classes.text}>
            Don&apos;t an Account? |{' '}
            <Link
              to={'/auth/sign-up'}
              style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 700
              }}
              className={classes.signup}
              onClick={handleClick}
            >
              Sign up
            </Link>
          </Typography>
            )}
      </div>
    );
  };

  return (
    <div>
      <Container>
        <div className={classes.background}></div>
        <Typography variant="h1" className={classes.logo} gutterBottom>
          byebuy
        </Typography>
        <AuthForm action={route} />
        {renderWelcome()}
      </Container>
    </div>
  );
}
