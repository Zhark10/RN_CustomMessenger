/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {TUseChatMiddleware} from './USE_ChatMiddleware';
import shortid from 'shortid';
import {useAutoScrollMessages} from './USE_AutoScrollForMessages';
import {isIos} from '../helpers/platform';
import {Keyboard} from 'react-native';

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
    const keyboardShowListener = isIos ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardDidShowListener = Keyboard.addListener(
      keyboardShowListener,
      () => {
        const scrollByTime = setTimeout(autoScrollToEnd, 500);
        return () => clearTimeout(scrollByTime);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

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
    const timeToShowNextMessage = botMessage[index].text
      ? botMessage[index].text!.length * 50
      : 2000;
    setTyping(true);
    const toShowNextMessage = setTimeout(() => {
      setIndex(currentIndex => currentIndex + 1);

      const formattedBotMessage = botMessage[index].text
        ? {text: botMessage[index].text}
        : {picture: botMessage[index].picture};
      chatMiddleware.refreshMessages(currentStack => [
        ...currentStack,
        {
          id: shortid.generate(),
          sender: 'chatBot',
          ...formattedBotMessage,
        },
      ]);
    }, timeToShowNextMessage);
    return () => clearTimeout(toShowNextMessage);
  }, [index]);

  const showAnswerField = React.useCallback(() => {
    const answerFieldShowByTime = setTimeout(() => {
      setAnswerFieldVisible(true);
      const cancelTypingByTime = setTimeout(() => {
        setTyping(false);
      }, 400);
      return () => clearTimeout(cancelTypingByTime);
    }, 2000);
    return () => clearTimeout(answerFieldShowByTime);
  }, [index]);

  React.useEffect(() => {
    if (index < botMessage.length) {
      addedNewMessageInStack();
      return () => {};
    }
    showAnswerField();
  }, [index]);

  // autoScrollToEnd();

  return {messages, isTyping, autoScrollToEnd, scrollView};
};
