/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {TUseChatMiddleware} from './USE_ChatMiddleware';
import shortid from 'shortid';
import {useAutoScrollMessages} from './USE_AutoScrollForMessages';

export const useRefreshMessageStack = (chatMiddleware: TUseChatMiddleware) => {
  const [index, setIndex] = React.useState(0);
  const [isTyping, setTyping] = React.useState(false);
  const {
    setAnswerFieldVisible,
    currentChatBotQuestion: {botMessage},
    messages,
  } = chatMiddleware;

  const {autoScrollToEnd, scrollView} = useAutoScrollMessages();

  React.useEffect(() => {
    const isLastMessageTypedMe =
      messages.length && messages[messages.length - 1].sender === 'me';
    if (isLastMessageTypedMe) {
      const waitingTime = messages[messages.length - 1].text
        ? messages[messages.length - 1].text!.length * 50 + 1500
        : 1000;
      const timer = setTimeout(() => setIndex(0), waitingTime);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const addedNewMessageInStack = React.useCallback(() => {
    const timeToShowNextMessage = botMessage[index].text.length * 50;
    setTyping(true);
    const toShowNextMessage = setTimeout(() => {
      setIndex(currentIndex => currentIndex + 1);
      chatMiddleware.refreshMessages(currentStack => [
        ...currentStack,
        {
          id: shortid.generate(),
          sender: 'chatBot',
          text: botMessage[index].text,
        },
      ]);
    }, timeToShowNextMessage);
    return () => clearTimeout(toShowNextMessage);
  }, [index]);

  const showAnswerField = React.useCallback(() => {
    const answerFieldShowByTime = setTimeout(() => {
      setAnswerFieldVisible(true);
      const autoscrollByTime = setTimeout(() => {
        setTyping(false);
      }, 800);
      return () => clearTimeout(autoscrollByTime);
    }, 1500);
    return () => clearTimeout(answerFieldShowByTime);
  }, [index]);

  React.useEffect(() => {
    if (index < botMessage.length) {
      addedNewMessageInStack();
      return () => {};
    }
    showAnswerField();
  }, [index]);

  autoScrollToEnd();

  return {messages, isTyping, autoScrollToEnd, scrollView};
};
