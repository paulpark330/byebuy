import React from 'react';
import { Typography, Card, CardContent, CardMedia, makeStyles, CardHeader } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  cover: {
    borderRadius: 5,
    margin: theme.spacing(2),
    width: 100,
    height: 100
  },
  title: {
    padding: theme.spacing(0),
    marginTop: theme.spacing(2)
  },
  location: {
    padding: theme.spacing(0),
    marginTop: theme.spacing(2)
  }
}));

export default function Post({ post }) {
  const classes = useStyles();
  return (
    <div>
      <Card elevation={1} className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={post.url !== null ? post.url : '/images/null.png'}
        />
        <div>
          <CardHeader
            className={classes.title}
            title={post.title}
            subheader={`$${post.price}`}
          />
          <CardContent className={classes.location}>
            <Typography variant="body2">{post.location}</Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );

}
