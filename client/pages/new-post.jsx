import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';

import NumberFormat from 'react-number-format';
import {
  makeStyles,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  button: {
    color: 'white'
  }
});

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default function NewPost() {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    title: '',
    category: '',
    price: '',
    description: ''
  });
  const [location, setLocation] = useState('');
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const KEY = 'AIzaSyDmADdAoHWHYXYsnAe1YAVaPgnlR6Fohow';
      let address = '';
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${KEY}`
      )
        .then(res => res.json())
        .then(result => {
          address = result.results[4].formatted_address;
          setLocation(address);
        });
    });
  });

  const [titleError, setTitleError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const handleChange = prop => event => {
    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setTitleError(false);
    setCategoryError(false);
    setPriceError(false);

    if (formValues.title === '') {
      setTitleError(true);
    }

    if (formValues.category === '') {
      setCategoryError(true);
    }

    if (formValues.price === '') {
      setPriceError(true);
    }

    if (formValues.title && formValues.category && formValues.price) {
      const req = {
        userId,
        title: formValues.title,
        category: formValues.category,
        price: formValues.price,
        description: formValues.description,
        location
      };
      const init = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(req)
      };
      fetch('/api/home', init)
        .then(res => res.json())
        .then(result => console.log(result));
    }
  };

  return (
    <Container>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          label="Post title"
          variant="outlined"
          color="primary"
          onChange={handleChange('title')}
          fullWidth
          required
          error={titleError}
        />
        <FormControl
          variant="outlined"
          className={classes.field}
          fullWidth
          required
          error={categoryError}
        >
          <InputLabel id="select-category">Category</InputLabel>
          <Select
            className={classes.field}
            labelId="select-category"
            label="Category"
            value={formValues.category}
            onChange={handleChange('category')}
            autoWidth
          >
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="furniture">Furniture</MenuItem>
            <MenuItem value="home-diy">Home & DIY</MenuItem>
            <MenuItem value="baby-kids">Baby & Kids</MenuItem>
            <MenuItem value="women-fashion">Women&apos;s Fashion</MenuItem>
            <MenuItem value="men-fashion">Men&apos;s Fashion</MenuItem>
            <MenuItem value="health-beauty">Health & Beauty</MenuItem>
            <MenuItem value="sports-leisure">Sports & Leisure</MenuItem>
            <MenuItem value="books-music">Books & Music</MenuItem>
            <MenuItem value="musical-instruments">Musical Instruments</MenuItem>
            <MenuItem value="vehicles-parts">Vehicles & Parts</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className={classes.field}
          label="Price"
          name="numberformat"
          variant="outlined"
          color="primary"
          onChange={handleChange('price')}
          InputProps={{
            inputComponent: NumberFormatCustom
          }}
          fullWidth
          required
          error={priceError}
        />
        <TextField
          className={classes.field}
          label="Item description"
          variant="outlined"
          color="primary"
          onChange={handleChange('description')}
          multiline
          rows={6}
          fullWidth
        />
        <Button
          className={classes.button}
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Done
        </Button>
      </form>
    </Container>
  );
}
