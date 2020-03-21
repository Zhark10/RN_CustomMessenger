/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useContext} from 'react';
import {View} from 'react-native';
import {TLibraryInputData} from '../utils/types';
import {AnswerType} from './types';
import {screenHeight, screenWidth} from '../utils/screen';
import {ChatContext} from '../store/ChatProvider';

export const MessangerStack: FC<TLibraryInputData> = libraryInputData => {
  const {
    currentMessage: [messageIndex],
  } = useContext(ChatContext)!;
  const currentChatBotQuestion = libraryInputData.messages[messageIndex];

  React.useEffect(() => {
    const isLastMessageInModel =
      messageIndex === (libraryInputData.messages.length = 1);

    if (isLastMessageInModel) {
      libraryInputData.events.endConversationEvent();
    }
  }, [messageIndex]);

  const selectAnswerField = React.useCallback((): React.ReactNode => {
    const randomView = () => (
      <View style={{width: 50, height: 50, backgroundColor: 'green'}} />
    );

    const answerFields = {
      [AnswerType.INPUT]: randomView,
      [AnswerType.BUTTON]: randomView,
      [AnswerType.PHOTO]: randomView,
      [AnswerType.CHOICE]: randomView,
      [AnswerType.TIMEPICKER]: randomView,
    };
    const AnswerField = answerFields[currentChatBotQuestion.myAnswerType];
    return <AnswerField />;
  }, []);

  return (
    <View
      style={{
        position: 'absolute',
        height: screenHeight,
        width: screenWidth,
        backgroundColor: 'red',
      }}>
      {selectAnswerField()}
    </View>
  );
};
