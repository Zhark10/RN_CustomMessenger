/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {TLibraryInputData} from './utils/types';
import {AnswerType} from './types';
import {useChatMiddleware} from './utils/current-message-info';
import {AnswerView} from './components/shared/AnswerAnimWrapper';
import {isIos} from './utils/platform';

export const MessangerStack: FC<TLibraryInputData> = libraryInputData => {
  const {currentChatBotQuestion, messageIndex} = useChatMiddleware(
    libraryInputData,
  );

  React.useEffect(() => {
    const isLastMessageInModel =
      messageIndex === (libraryInputData.messages.length = 1);

    if (isLastMessageInModel) {
      libraryInputData.events.endConversationEvent();
    }
  }, [messageIndex]);

  const selectAnswerField = React.useCallback((): React.ReactNode => {
    const randomView: any = () => (
      <View style={{width: 50, height: 50, backgroundColor: 'green'}} />
    );

    const answerFields = {
      [AnswerType.INPUT]: AnswerView.Input,
      [AnswerType.MULTICHOICE]: randomView,
      [AnswerType.PHOTO]: randomView,
      [AnswerType.CHOICE]: randomView,
      [AnswerType.DATEPICKER]: randomView,
      [AnswerType.ONLY_BUTTON]: randomView,
    };
    const AnswerField = answerFields[currentChatBotQuestion.myAnswerType];
    return <AnswerField {...libraryInputData} />;
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : undefined}
      style={{
        flex: 1,
      }}>
      {selectAnswerField()}
    </KeyboardAvoidingView>
  );
};
