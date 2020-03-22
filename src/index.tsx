/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import {TLibraryInputData} from './utils/types';
import {AnswerType} from './types';
import {useChatMiddleware} from './utils/current-message-info';
import {AnswerView} from './components/shared/AnswerAnimWrapper';
import {isIos} from './utils/platform';

export const MessangerStack: FC<TLibraryInputData> = libraryInputData => {
  const chatMiddleware = useChatMiddleware(libraryInputData);
  const {messageIndex, currentChatBotQuestion} = chatMiddleware;

  React.useEffect(() => {
    const isLastMessageInModel =
      messageIndex === (libraryInputData.messages.length = 1);

    if (isLastMessageInModel) {
      libraryInputData.events.endConversationEvent();
    }
  }, [messageIndex]);

  const selectAnswerField = React.useCallback((): React.ReactNode => {
    const answerFields = {
      [AnswerType.INPUT]: AnswerView.Input,
      [AnswerType.MULTICHOICE]: AnswerView.Multichoice,
      [AnswerType.PHOTO]: AnswerView.Input,
      [AnswerType.CHOICE]: AnswerView.Input,
      [AnswerType.DATEPICKER]: AnswerView.Input,
      [AnswerType.ONLY_BUTTON]: AnswerView.Input,
    };
    const AnswerField = answerFields[currentChatBotQuestion.myAnswerType];
    return (
      <AnswerField
        chatMiddleware={chatMiddleware}
        libraryInputData={libraryInputData}
      />
    );
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : undefined}
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
        }}
      />
      {selectAnswerField()}
    </KeyboardAvoidingView>
  );
};
