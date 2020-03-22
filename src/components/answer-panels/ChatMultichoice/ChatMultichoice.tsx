import React, {FC} from 'react';
import {View} from 'react-native';
import {ChatMultichoiceStyles} from './ChatMultichoiceStyles';
import {IAnswer} from '../../shared/AnswerAnimWrapper';

const Multichoice: FC<IAnswer> = ({
  libraryInputData,
  currentMessageInfo: {sendAnswer},
}) => {

  return (
    <View style={ChatMultichoiceStyles.main}>
      
    </View>
  );
};

export const ChatMultichoice = React.memo(Multichoice);
