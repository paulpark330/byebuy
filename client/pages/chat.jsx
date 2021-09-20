import React, { useEffect, useContext } from 'react';
import {
  App as SendBirdApp,
  SendBirdProvider,
  withSendBird,
  ChannelList,
  Channel
} from 'sendbird-uikit';
import { makeStyles } from '@material-ui/core';
import AppContext from '../lib/app-context';

const useStyles = makeStyles(theme => {
  return {
    channelList: {
      display: 'flex',
      justifyContent: 'center',
      height: '80vh'
    }
  };
});

export default function Chat() {
  const { username, userId } = useContext(AppContext);
  const { setPageTitle } = useContext(AppContext);
  const classes = useStyles();
  useEffect(() => {
    setPageTitle('Chat');
  }, []);

  const MyCustomPreview = ({ channel, onLeaveChannel }) => (
    <div style={{ border: '1px solid gray' }}>
      <img height="20px" width="20px" src={channel.coverUrl} />
      <button
        onClick={() => {
          const callback = () => {
            console.warn('Leave channel success');
          };
          onLeaveChannel(channel, callback);
        }}
      >
        {' '}
        Leave
      </button>
    </div>
  );

  return (
    <div>
      <SendBirdProvider
        appId={process.env.APP_ID}
        userId={userId.toString()}
        nickname={username}
      >
        <div className="App">
          <SendBirdApp
            appId={process.env.APP_ID}
            userId={userId.toString()}
            nickname={username}
          >
            {/* <div className={classes.channelList}>
            <ChannelList
              renderChannelPreview={MyCustomPreview}
              onChannelSelect={channel => {
                console.warn(channel);
              }}
            />
          </div> */}
          </SendBirdApp>
        </div>
      </SendBirdProvider>
    </div>
  );
}
