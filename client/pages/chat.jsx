import React, { useEffect, useContext } from 'react';
import {
  App as SendBirdApp,
  SendBirdProvider,
  withSendBird,
  ChannelList,
  Channel
} from 'sendbird-uikit';
import AppContext from '../lib/app-context';

export default function Chat() {
  const { username, userId } = useContext(AppContext);

  const { setPageTitle } = useContext(AppContext);
  useEffect(() => {
    setPageTitle('Chat');
  }, []);

  const appId = 'ADE84D52-B56A-457C-9E88-47B8737C4DF5';
  const nickname = username;

  return (
    <div>
      <SendBirdApp
        appId={appId}
        userId={userId.toString()}
        nickname={nickname}
      />
    </div>
  );
}
