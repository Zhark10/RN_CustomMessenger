import {TOnlyOneMessageIteration} from './../types';
import {useContext} from 'react';
import {ChatContext} from '../store/ChatProvider';
import {TLibraryInputData} from './types';

export type TUseAnswerFieldAnimation = {
  currentChatBotQuestion: TOnlyOneMessageIteration;
  messageIndex: number;
  setNewMessageIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const useCurrentMessageInfo = (libraryInputData: TLibraryInputData) => {
  const {
    currentMessage: [messageIndex, setNewMessageIndex],
  } = useContext(ChatContext)!;
  const currentChatBotQuestion = libraryInputData.messages[messageIndex];

  return {
    currentChatBotQuestion,
    messageIndex,
    setNewMessageIndex,
  };
};
