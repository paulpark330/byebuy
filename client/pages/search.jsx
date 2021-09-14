import React, { useEffect, useContext } from 'react';
import AppContext from '../lib/app-context';

export default function Search() {
  const { setRoute } = useContext(AppContext);
  useEffect(() => {
    setRoute('Search');
  }, []);
  return <div></div>;
}
