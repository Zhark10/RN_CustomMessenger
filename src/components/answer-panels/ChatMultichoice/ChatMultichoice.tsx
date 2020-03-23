import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {ChatMultichoiceStyles} from './ChatMultichoiceStyles';
import {IAnswer} from '../../../../src/types';

const Multichoice: FC<IAnswer> = ({libraryInputData, chatMiddleware}) => {
  return (
    <View style={ChatMultichoiceStyles.main}>
      <Text>{chatMiddleware.currentChatBotQuestion.myAnswerType}</Text>
    </View>
  );
};

export const ChatMultichoice = React.memo(Multichoice);
