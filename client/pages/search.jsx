import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../lib/app-context';
import { Grid, Container, makeStyles, TextField, InputAdornment } from '@material-ui/core';
import Post from '../components/post';
import { Search as SearchIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => {
  return {
    field: {
      alignItems: 'baseline'
    },
    root: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2)
    }
  };
});

export default function Search() {
  const history = useHistory();
  const classes = useStyles();
  const { setRoute } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    setRoute('Search');
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push('/search?' + new URLSearchParams({ input: search }));
    fetch('api/search?' + new URLSearchParams({ input: search }))
      .then(res => res.json())
      .then(result => setResults(result));
  };

  return (
    <div>
      <Container maxWidth="sm">
        <form
          id="search-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            onChange={handleChange}
            fullWidth
            size="medium"
            variant="filled"
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className={classes.icon} />
                </InputAdornment>
              )
            }}
          />
        </form>
        <Container className={classes.root}>
          <Grid container spacing={1}>
            {results.map(post => (
              <Grid item key={post.postId} xs={12} sm={6} md={3}>
                <Post post={post} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </div>
  );
}
