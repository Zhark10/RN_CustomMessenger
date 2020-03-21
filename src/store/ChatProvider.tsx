import * as React from 'react';
import {createContext, useState} from 'react';
import {TStore} from './TChatProvider';

export const ChatContext = createContext<TStore | null>(null);

export default ({children}: any) => {
  const [messages, refreshMessages] = useState<>();
  const [messageIndex, setNewMessageIndex] = useState<number>(0);
  const [savedChatInfo, refreshChatInfo] = useState();

  const store: TStore = {
    messageStack: [messages, refreshMessages],
    currentMessage: [messageIndex, setNewMessageIndex],
    chatInfo: [savedChatInfo, refreshChatInfo],
  };

  return <ChatContext.Provider value={store}>{children}</ChatContext.Provider>;
};
