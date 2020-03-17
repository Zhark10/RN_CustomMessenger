/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View} from 'react-native';
import {TLibraryInputData} from 'src/global/types';
import {screenHeight, screenWidth} from 'src/global/screen';
import {ActionTypes} from './types';

export const Messanger: FC<TLibraryInputData> = libraryInputData => {
  const selectAnswerField = React.useCallback((): React.ReactNode => {
    const currentMessageType = libraryInputData.messangerData.messages[0].type;
    const randomView = <View />;

    const answerFields: any = {
      [ActionTypes.INPUT]: randomView,
      [ActionTypes.BUTTON]: randomView,
      [ActionTypes.PHOTO]: randomView,
      [ActionTypes.CHOICE]: randomView,
      [ActionTypes.TIMEPICKER]: randomView,
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
