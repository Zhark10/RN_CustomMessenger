/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {TUseChatMiddleware} from './USE_ChatMiddleware';
import {TMessageAddedInStack} from '../../store/T_ChatProvider';

export const useRefreshMessageStack = (
  chatMiddleware: TUseChatMiddleware,
  refreshMessages: React.Dispatch<React.SetStateAction<TMessageAddedInStack[]>>,
) => {
  const [index, setIndex] = React.useState(0);
  const [typing, setTyping] = React.useState(false);
  const {
    setAnswerFieldVisible,
    currentChatBotQuestion: {botMessage},
  } = chatMiddleware;

  React.useEffect(() => {
    if (index < botMessage.length) {
      setTyping(true);
      refreshMessages(currentStack => [
        ...currentStack,
        {
          id: botMessage[index].text,
          sender: 'chatBot',
          text: botMessage[index].text,
        },
      ]);
      const timeToShowNextMessage = botMessage[index].text.length * 70;
      const toShowNextMessage = setTimeout(() => {
        setIndex(currentIndex => currentIndex + 1);
      }, timeToShowNextMessage);
      return () => clearTimeout(toShowNextMessage);
    } else {
      setAnswerFieldVisible(true);
    }
  }, [index]);

  return typing;
};
