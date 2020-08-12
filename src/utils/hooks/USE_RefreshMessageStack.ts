import React, { useState, useEffect, useCallback } from 'react';
import {TUseChatMiddleware} from './USE_ChatMiddleware';
import shortid from 'shortid';
import {useAutoScrollMessages} from './USE_AutoScrollForMessages';
import {isIos} from '../helpers/platform';
import {Keyboard} from 'react-native';

export const useRefreshMessageStack = (chatMiddleware: TUseChatMiddleware) => {
  const [index, setIndex] = useState(0);
  const [isTyping, setTyping] = useState(false);
  const {
    setAnswerFieldVisible,
    currentChatBotQuestion: {botMessage},
    messages,
  } = chatMiddleware;

  const {autoScrollToEnd, scrollView} = useAutoScrollMessages();

  useEffect(function scrollDownWhenKeyboardIsOpen(){
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

  useEffect(function needToProvokeABotMessage() {
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

  const addedNewMessageInStack = useCallback(() => {
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

  const showAnswerField = useCallback(() => {
    const answerFieldShowByTime = setTimeout(() => {
      setAnswerFieldVisible(true);
      const cancelTypingByTime = setTimeout(() => {
        setTyping(false);
      }, 400);
      return () => clearTimeout(cancelTypingByTime);
    }, 2000);
    return () => clearTimeout(answerFieldShowByTime);
  }, [index]);

  useEffect(function addNewBotMessageWhileStackIsNotEmpty() {
    if (index < botMessage.length) {
      addedNewMessageInStack();
      return () => {};
    }
    showAnswerField();
  }, [index]);

  return {messages, isTyping, autoScrollToEnd, scrollView};
};
