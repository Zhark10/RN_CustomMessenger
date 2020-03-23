import React, {FC} from 'react';
import {View, CheckBox, Text} from 'react-native';
import {ChatMultichoiceStyles} from './S_ChatMultichoice';
import {IAnswer} from '../../../types';

const Multichoice: FC<IAnswer> = ({libraryInputData, chatMiddleware}) => {
  return (
    <View style={ChatMultichoiceStyles.main}>
      <View style={ChatMultichoiceStyles.checkboxBlock}>
        <CheckBox value={true} disabled={false} />
        <Text style={ChatMultichoiceStyles.checkboxText}>Male</Text>
      </View>
      <View style={ChatMultichoiceStyles.checkboxBlock}>
        <CheckBox value={true} disabled={false} />
        <Text style={ChatMultichoiceStyles.checkboxText}>Female</Text>
      </View>
      <View style={ChatMultichoiceStyles.checkboxBlock}>
        <CheckBox value={true} disabled={false} />
        <Text style={ChatMultichoiceStyles.checkboxText}>Other</Text>
      </View>
    </View>
  );
};

export const ChatMultichoice = React.memo(Multichoice);
