import * as React from 'react';
import {createContext, useState} from 'react';

export const ChatContext = createContext(null);

export default ({children}: any) => {
  const [messages, refreshMessages] = useState(null);
  const [message, selectMessage] = useState(null);

  const store: any = {
    messageStack: [messages, refreshMessages],
    currentMessage: [message, selectMessage],
  };

  return <ChatContext.Provider value={store}>{children}</ChatContext.Provider>;
};
