import React, {FC} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {ChatInputStyles} from './ChatInputStyles';
import {IAnswer} from '../../../components/shared/AnswerAnimWrapper';

const Input: FC<IAnswer> = ({
  libraryInputData,
  currentMessageInfo: {nextQuestionRequest},
}) => {
  const [text, setText] = React.useState('');
  const isValidated = text.length > 0 && text.length < 50;

  const onChangeText = React.useCallback((value: string) => setText(value), [
    setText,
  ]);

  const sendAnswer = React.useCallback(() => {
    sendAnswer();
  }, [nextQuestionRequest]);

  return (
    <View style={ChatInputStyles.main}>
      <TextInput style={ChatInputStyles.input} onChangeText={onChangeText} />
      <TouchableOpacity
        activeOpacity={1}
        disabled={!isValidated}
        onPress={sendAnswer}>
        <View style={ChatInputStyles.touchable} />
      </TouchableOpacity>
    </View>
  );
};

export const ChatInput = React.memo(Input);
