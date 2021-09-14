import React, { useEffect, useContext } from 'react';
import AppContext from '../lib/app-context';

export default function Favorites() {
  const { setRoute } = useContext(AppContext);
  useEffect(() => {
    setRoute('Favorites');
  }, []);
  return <div></div>;
}
