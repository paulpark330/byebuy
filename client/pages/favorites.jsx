import React, { useEffect, useContext } from 'react';
import AppContext from '../lib/app-context';

export default function Favorites() {
  const { setPageTitle } = useContext(AppContext);
  useEffect(() => {
    setPageTitle('Favorites');
  }, []);
  return <div></div>;
}
