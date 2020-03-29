/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {TUseChatMiddleware} from './USE_ChatMiddleware';
import shortid from 'shortid';

export const useRefreshMessageStack = (chatMiddleware: TUseChatMiddleware) => {
  const [index, setIndex] = React.useState(0);
  const {
    setAnswerFieldVisible,
    currentChatBotQuestion: {botMessage},
    messages,
  } = chatMiddleware;
  const isTyping = messages.length < botMessage.length;


  React.useEffect(() => {
    if (index < botMessage.length) {
      const timeToShowNextMessage = botMessage[index].text.length * 90;
      const toShowNextMessage = setTimeout(() => {
        chatMiddleware.refreshMessages(currentStack => [
          ...currentStack,
          {
            id: shortid.generate(),
            sender: 'chatBot',
            text: botMessage[index].text,
          },
        ]);
        setIndex(currentIndex => currentIndex + 1);
      }, timeToShowNextMessage);
      return () => clearTimeout(toShowNextMessage);
    } else {
      setAnswerFieldVisible(true);
    }
  }, [index]);

  React.useEffect(() => {
    const isLastMessageTypedMe =
      messages.length && messages[messages.length - 1].sender === 'me';
    if (isLastMessageTypedMe) {
      const waitingTime = messages[messages.length - 1].text!.length * 90;
      const timer = setTimeout(() => setIndex(0), waitingTime);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  return {messages, isTyping};
};
