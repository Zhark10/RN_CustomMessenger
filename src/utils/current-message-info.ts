/* eslint-disable @typescript-eslint/no-unused-vars */
import {TOnlyOneMessageIteration} from './../types';
import {useContext, useState} from 'react';
import {ChatContext} from '../store/ChatProvider';
import {TLibraryInputData} from './types';
import {TSavedOneIterationAnswer} from '../store/TChatProvider';
import React from 'react';

export type TUseChatMiddleware = {
  currentChatBotQuestion: TOnlyOneMessageIteration;
  messageIndex: number;
  sendAnswer: (answer: TSavedOneIterationAnswer) => void;
  answerFieldVisible: boolean;
  setAnswerFieldVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useChatMiddleware = (
  libraryInputData: TLibraryInputData,
): TUseChatMiddleware => {
  const {
    currentMessage: [messageIndex, setNewMessageIndex],
    chatInfo: [_, refreshChatInfo],
  } = useContext(ChatContext)!;

  const [answerFieldVisible, setAnswerFieldVisible] = useState(false);
  const currentChatBotQuestion = libraryInputData.messages[messageIndex];

  const sendAnswer = (answer: TSavedOneIterationAnswer) => {
    setAnswerFieldVisible(false);
    refreshChatInfo(currentState => [...currentState, ...answer]);
    setNewMessageIndex(current => current + 1);
  };

  return {
    currentChatBotQuestion,
    messageIndex,
    sendAnswer,
    answerFieldVisible,
    setAnswerFieldVisible,
  };
};
