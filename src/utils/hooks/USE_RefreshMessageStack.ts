import React from 'react';
import {TUseChatMiddleware} from './USE_ChatMiddleware';
import {TMessageAddedInStack} from '../../store/T_ChatProvider';

export const useRefreshMessageStack = (
  chatMiddleware: TUseChatMiddleware,
  refreshMessages: React.Dispatch<React.SetStateAction<TMessageAddedInStack[]>>,
) => {
  const [index, setIndex] = React.useState(0);
  const {
    setAnswerFieldVisible,
    currentChatBotQuestion: {botMessage},
  } = chatMiddleware;

  React.useEffect(() => {
    if (index < botMessage.length) {
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
  }, [botMessage, index, refreshMessages, setAnswerFieldVisible]);
};
