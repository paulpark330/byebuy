import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../lib/app-context';
import {
  Grid,
  Container,
  makeStyles,
  TextField,
  InputAdornment
} from '@material-ui/core';
import Post from '../components/post';
import { Search as SearchIcon } from '@material-ui/icons';
import { useHistory, useLocation, Link } from 'react-router-dom';

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
  const location = useLocation();
  const classes = useStyles();
  const { setPageTitle } = useContext(AppContext);

  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    setPageTitle('Search');
  }, []);

  useEffect(() => {
    const init = {
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      }
    };
    fetch(`api/search${location.search}`, init)
      .then(res => res.json())
      .then(result => setResults(result));
  }, [location.search]);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newQuery = new URLSearchParams({ input: search });
    history.push(`search?${newQuery}`);
  };

  return (
    <div>
      <Container>
        <form
          id="search-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            onChange={handleChange}
            autoFocus={true}
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
      </Container>
    </div>
  );
}
