import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../lib/app-context';
import { Grid, Container, makeStyles } from '@material-ui/core';
import Post from '../components/post';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center'
    }
  };
});

export default function Home() {
  const { setPageTitle } = useContext(AppContext);

  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPageTitle('Home');
    fetch('/api/home')
      .then(res => res.json())
      .then(posts => setPosts(posts));
  }, []);

  return (
    <Container className={classes.root}>
      <Grid container spacing={1}>
        {posts.map(post => (
          <Grid item key={post.postId} xs={12} sm={6} md={3}>
            <Link
              to={`/post?postId=${post.postId}`}
              style={{ textDecoration: 'none' }}
            >
              <Post post={post} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
