import React, { useEffect, useContext } from 'react';

import { App as SendBirdApp, SendBirdProvider } from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';
import AppContext from '../lib/app-context';

export default function Chat() {
  const { username, userId } = useContext(AppContext);
  const { setPageTitle } = useContext(AppContext);
  useEffect(() => {
    setPageTitle('Chat');
  }, []);

  return (
    <div className="customized-app">
      <SendBirdProvider
        appId={process.env.APP_ID}
        userId={userId.toString()}
        nickname={username}
      >
        <SendBirdApp
          appId={process.env.APP_ID}
          userId={userId.toString()}
          nickname={username}
        />
      </SendBirdProvider>
    </div>
  );
}
