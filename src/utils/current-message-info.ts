/* eslint-disable @typescript-eslint/no-unused-vars */
import {TOnlyOneMessageIteration} from './../types';
import {useContext} from 'react';
import {ChatContext} from '../store/ChatProvider';
import {TLibraryInputData} from './types';
import {TSavedOneIterationAnswer} from '../store/TChatProvider';

export type TUseChatMiddleware = {
  currentChatBotQuestion: TOnlyOneMessageIteration;
  messageIndex: number;
  sendAnswer: (answer: TSavedOneIterationAnswer) => void;
};

export const useChatMiddleware = (libraryInputData: TLibraryInputData) => {
  const {
    currentMessage: [messageIndex, setNewMessageIndex],
    chatInfo: [_, refreshChatInfo],
  } = useContext(ChatContext)!;
  const currentChatBotQuestion = libraryInputData.messages[messageIndex];

  const sendAnswer = (answer: TSavedOneIterationAnswer) => {
    refreshChatInfo(currentState => [...currentState, ...answer]);
    setNewMessageIndex(current => current + 1);
  };

  return {
    currentChatBotQuestion,
    messageIndex,
    sendAnswer,
  };
};
