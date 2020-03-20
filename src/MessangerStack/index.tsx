/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View} from 'react-native';
import {TLibraryInputData} from '../utils/types';
import {AnswerType} from './types';
import {screenHeight, screenWidth} from '../utils/screen';

export const MessangerStack: FC<TLibraryInputData> = libraryInputData => {
  const selectAnswerField = React.useCallback((): React.ReactNode => {
    const currentMessageType = libraryInputData.messages[0].myAnswerType;
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
    const AnswerField = answerFields[currentMessageType];
    return <AnswerField />;
  }, [libraryInputData.messages]);

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
