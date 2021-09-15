import React, { useEffect, useContext } from 'react';
import AppContext from '../lib/app-context';

export default function Profile() {
  const { setPageTitle } = useContext(AppContext);
  useEffect(() => {
    setPageTitle('Profile');
  }, []);
  return <div></div>;
}
