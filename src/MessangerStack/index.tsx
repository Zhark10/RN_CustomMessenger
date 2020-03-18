/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View} from 'react-native';
import {TLibraryInputData} from '../global/types';
import {AnswerType} from './types';
import {screenHeight, screenWidth} from '../../src/global/screen';

export const Messanger: FC<TLibraryInputData> = libraryInputData => {
  const selectAnswerField = React.useCallback((): React.ReactNode => {
    const currentMessageType =
      libraryInputData.messangerData.messages[0].myAnswerType;
    const randomView = <View />;

    const answerFields: any = {
      [AnswerType.INPUT]: randomView,
      [AnswerType.BUTTON]: randomView,
      [AnswerType.PHOTO]: randomView,
      [AnswerType.CHOICE]: randomView,
      [AnswerType.TIMEPICKER]: randomView,
    };
    const AnswerField: any = answerFields[currentMessageType];
    return <AnswerField />;
  }, [libraryInputData.messangerData.messages]);

  return (
    <View
      style={{
        position: 'absolute',
        height: screenHeight,
        width: screenWidth,
        backgroundColor: '#FFF',
      }}>
      {selectAnswerField()}
    </View>
  );
};
