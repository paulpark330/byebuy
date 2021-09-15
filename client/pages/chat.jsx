import React, { useEffect, useContext } from 'react';
import AppContext from '../lib/app-context';

export default function Chat() {
  const { setPageTitle } = useContext(AppContext);
  useEffect(() => {
    setPageTitle('Chat');
  }, []);
  return <div></div>;
}
