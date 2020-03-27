import {TMessageAddedInStack} from './../../store/T_ChatProvider';
import {TOnlyOneMessageIteration} from '../../types';
import {useContext, useState} from 'react';
import {ChatContext} from '../../store/ChatProvider';
import {TLibraryInputData, TOutputData} from '../../types/T_LibraryInputData';
import React from 'react';

export type TUseChatMiddleware = {
  currentChatBotQuestion: TOnlyOneMessageIteration;
  messageIndex: number;
  sendAnswer: (answer: any) => void;
  answerFieldVisible: boolean;
  setAnswerFieldVisible: React.Dispatch<React.SetStateAction<boolean>>;
  savedChatInfo: TOutputData;
  isLastMessageInModel: boolean;
  refreshMessages: React.Dispatch<React.SetStateAction<TMessageAddedInStack[]>>;
  messages: TMessageAddedInStack[];
};

export const useChatMiddleware = (
  libraryInputData: TLibraryInputData,
): TUseChatMiddleware => {
  const {
    currentMessage: [messageIndex, setNewMessageIndex],
    chatInfo: [savedChatInfo, refreshChatInfo],
    messageStack: [messages, refreshMessages],
  } = useContext(ChatContext)!;

  const [answerFieldVisible, setAnswerFieldVisible] = useState(false);
  const isLastMessageInModel =
    messageIndex === libraryInputData.messages.length - 1;

  const currentChatBotQuestion = libraryInputData.messages[messageIndex];
  const myAnswerType = Object.getOwnPropertyNames(
    currentChatBotQuestion.myAnswer,
  )[0];

  const currentKeyForFormdata =
    currentChatBotQuestion.myAnswer[myAnswerType].keyForFormData;

  const sendAnswer = React.useCallback(
    (answer: any) => {
      setAnswerFieldVisible(false);

      refreshChatInfo(currentState => ({
        ...currentState,
        [currentKeyForFormdata]: answer,
      }));

      refreshMessages(currentStack => [
        ...currentStack,
        {
          id: answer,
          sender: 'me',
          text: answer,
        },
      ]);

      if (isLastMessageInModel) {
        libraryInputData.events.endConversationEvent(savedChatInfo);
        return null;
      }
      const timeout = setTimeout(() => {
        setNewMessageIndex(current => current + 1);
      }, answer.length * 90);
      return () => clearTimeout(timeout);
    },
    [
      currentKeyForFormdata,
      isLastMessageInModel,
      libraryInputData.events,
      refreshChatInfo,
      refreshMessages,
      savedChatInfo,
      setNewMessageIndex,
    ],
  );

  return {
    currentChatBotQuestion,
    messageIndex,
    sendAnswer,
    answerFieldVisible,
    setAnswerFieldVisible,
    savedChatInfo,
    isLastMessageInModel,
    refreshMessages,
    messages,
  };
};
