import { Button } from '@material-ui/core';
import React, { useEffect, useContext } from 'react';
import AppContext from '../lib/app-context';
import { useHistory } from 'react-router-dom';

export default function Profile() {
  const { setPageTitle, handleSignOut } = useContext(AppContext);
  const history = useHistory();
  useEffect(() => {
    setPageTitle('Profile');
  }, []);

  const handleClick = () => {
    handleSignOut();
    history.push('/auth');
  };

  return (
    <Button
      variant="contained"
      color="primary"
      style={{ color: 'white' }}
      onClick={handleClick}
    >
      Log Out
    </Button>
  );
}
