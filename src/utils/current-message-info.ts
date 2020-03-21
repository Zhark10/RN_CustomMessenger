import {useContext} from 'react';
import {ChatContext} from '../store/ChatProvider';
import {TLibraryInputData} from './types';

export const useCurrentMessageInfo = (libraryInputData: TLibraryInputData) => {
  const {
    currentMessage: [messageIndex],
  } = useContext(ChatContext)!;
  const currentChatBotQuestion = libraryInputData.messages[messageIndex];

  return {
    currentChatBotQuestion,
    messageIndex,
  };
};
