import React, { useEffect, useContext } from 'react';
import AppContext from '../lib/app-context';

export default function Profile() {
  const { setRoute } = useContext(AppContext);
  useEffect(() => {
    setRoute('Profile');
  }, []);
  return <div></div>;
}
