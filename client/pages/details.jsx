import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import {
  Container,
  makeStyles,
  AppBar,
  Typography,
  Toolbar,
  Button,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Avatar,
  IconButton
} from '@material-ui/core';
import { FavoriteBorder, ArrowBack } from '@material-ui/icons';

import AppContext from '../lib/app-context';

const useStyles = makeStyles(theme => {
  return {
    root: {
      flexGrow: 1,
      position: 'fixed',
      top: '0',
      bottom: 'auto',
      height: '100vh'
    },
    toolbar: {
      backgroundColor: 'white'
    },
    bottomAppBar: {
      position: 'fixed',
      top: 'auto',
      bottom: '0'
    },
    price: {
      flexGrow: 1,
      marginRight: theme.spacing(2)
    },
    cover: {
      height: '50vh',
      width: '100vw'
    },
    favoriteBorder: {
      fontSize: 30
    },
    header: {
      paddingBottom: theme.spacing(1)
    },
    postContent: {
      paddingTop: '0'
    },
    iconButton: {
      position: 'absolute',
      top: theme.spacing(0),
      left: theme.spacing(0)
    },
    arrowBack: {
      fontSize: 40
    }

  };
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Details() {
  const { setPageTitle } = useContext(AppContext);
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();

  const [post, setpost] = useState([]);

  useEffect(() => {
    const postId = query.get('postId');
    setPageTitle('Details');
    fetch(`/api/post/${postId}`)
      .then(res => res.json())
      .then(post => {
        setpost(post);
      });
  }, []);

  return (
    <div>
      <Card elevation={1} className={classes.root}>
        <IconButton className={classes.iconButton} onClick={() => history.goBack()}>
          <ArrowBack className={classes.arrowBack} />
        </IconButton>
        <CardMedia
          component="img"
          className={classes.cover}
          image={post.url !== null ? post.url : '/images/null.png'}
        />
        <div>
          <CardHeader
            className={classes.header}
            avatar={<Avatar className={classes.avatar}>A</Avatar>}
            action={
              <IconButton>
                <FavoriteBorder className={classes.favoriteBorder} />
              </IconButton>
            }
            title={post.nickname}
            subheader={post.location}
          />
          <CardContent className={classes.postContent}>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2">{post.description}</Typography>
          </CardContent>
        </div>
      </Card>
      <Container maxWidth="sm">
        <AppBar className={classes.bottomAppBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h5" className={classes.price}>
              {`$${post.price}`}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ color: 'white' }}
            >
              Chat
            </Button>
          </Toolbar>
        </AppBar>
      </Container>
    </div>
  );
}
