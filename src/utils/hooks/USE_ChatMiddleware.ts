/* eslint-disable @typescript-eslint/no-unused-vars */
import {TOnlyOneMessageIteration} from '../../types';
import {useContext, useState} from 'react';
import {ChatContext} from '../../store/ChatProvider';
import {TLibraryInputData, TOutputData} from '../../types/T_LibraryInputData';
import React from 'react';

export type TUseChatMiddleware = {
  currentChatBotQuestion: TOnlyOneMessageIteration;
  messageIndex: number;
  sendAnswer: (answer: string) => void;
  answerFieldVisible: boolean;
  setAnswerFieldVisible: React.Dispatch<React.SetStateAction<boolean>>;
  savedChatInfo: TOutputData;
};

export const useChatMiddleware = (
  libraryInputData: TLibraryInputData,
): TUseChatMiddleware => {
  const {
    currentMessage: [messageIndex, setNewMessageIndex],
    chatInfo: [savedChatInfo, refreshChatInfo],
  } = useContext(ChatContext)!;

  const [answerFieldVisible, setAnswerFieldVisible] = useState(false);
  const currentChatBotQuestion = libraryInputData.messages[messageIndex];

  const sendAnswer = (answer: string) => {
    setAnswerFieldVisible(false);
    refreshChatInfo(currentState => ({
      ...currentState,
      [currentChatBotQuestion.keyForFormData]: answer,
    }));
    setNewMessageIndex(current => current + 1);
  };

  return {
    currentChatBotQuestion,
    messageIndex,
    sendAnswer,
    answerFieldVisible,
    setAnswerFieldVisible,
    savedChatInfo,
  };
};
