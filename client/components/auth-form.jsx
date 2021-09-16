import React, { useState } from 'react';
import { Container, makeStyles, TextField, InputAdornment, IconButton, Button } from '@material-ui/core';
import { AccountCircle, KeyboardArrowRight, Lock, Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: theme.spacing(8)
    },
    field: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      display: 'flex'
    },
    input: {
      color: theme.palette.primary.light,
      borderColor: theme.palette.primary.light
    },
    button: {
      color: theme.palette.primary.main
    },
    icon: {
      color: theme.palette.primary.light
    }
  };
});

export default function AuthForm() {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  });

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [visibility, setVisibility] = useState(false);

  const handleChange = prop => e => {
    setFormValues({ ...formValues, [prop]: e.target.value });
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUsernameError(false);
    setPasswordError(false);

    const newAccount = new FormData(e.target);

    if (formValues.username === '') {
      setUsernameError(true);
    }

    if (formValues.password === '') {
      setPasswordError(true);
    }

    if (formValues.username && formValues.password) {
      let init = {
        method: 'POST',
        body: newAccount
      };
      fetch('/api/register', init)
        .then(res => res.json())
        .then(user => {
          init = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Api-Token': process.env.API_TOKEN
            },
            body: JSON.stringify({
              user_id: user.userId,
              nickname: user.nickname,
              profile_url: ''
            })
          };
          fetch(
            `https://api-${process.env.APP_ID}.sendbird.com/v3/users`, init
          )
            .then(res => res.json())
            .then(result => {
              document.querySelector('#auth-form').reset();
            });
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div>
      <Container className={classes.root} maxWidth="sm">
        <form
          id="auth-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            className={classes.field}
            label="Username"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            name="username"
            error={usernameError}
            onChange={handleChange('username')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle className={classes.icon} />
                </InputAdornment>
              ),
              classes: {
                input: classes.input
              }
            }}
          />
          <TextField
            className={classes.field}
            label="Password"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            name="password"
            error={passwordError}
            onChange={handleChange('password')}
            type={visibility ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className={classes.icon} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleVisibility}>
                    {visibility
                      ? (
                      <Visibility className={classes.icon} />
                        )
                      : (
                      <VisibilityOff className={classes.icon} />
                        )}
                  </IconButton>
                </InputAdornment>
              ),
              className: classes.input
            }}
          />
          <Button
            className={classes.button}
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={<KeyboardArrowRight />}
            size="large"
          >
            REGISTER
          </Button>
        </form>
      </Container>
    </div>
  );
}
