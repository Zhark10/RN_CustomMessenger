/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {TUseChatMiddleware} from './USE_ChatMiddleware';

export const useRefreshMessageStack = (chatMiddleware: TUseChatMiddleware) => {
  const [index, setIndex] = React.useState(0);
  const [typing, setTyping] = React.useState(false);
  const {
    setAnswerFieldVisible,
    currentChatBotQuestion: {botMessage},
    messages,
  } = chatMiddleware;

  React.useEffect(() => {
    if (index < botMessage.length) {
      const timeToShowNextMessage = botMessage[index].text.length * 90;
      setTyping(true);
      chatMiddleware.refreshMessages(currentStack => [
        ...currentStack,
        {
          id: botMessage[index].text,
          sender: 'chatBot',
          text: botMessage[index].text,
        },
      ]);
      const toShowNextMessage = setTimeout(() => {
        setTyping(false);
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

  return {messages, typing};
};
