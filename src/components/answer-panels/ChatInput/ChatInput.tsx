import React, {FC} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {ChatInputStyles} from './S_ChatInput';
import {TChatProps} from 'src/types';

const Input: FC<TChatProps> = ({chatMiddleware}) => {
  const [text, setText] = React.useState('');
  const isValidated = text.length > 0 && text.length < 50;

  const onChangeText = React.useCallback((value: string) => setText(value), [
    setText,
  ]);

  const onPress = React.useCallback(() => {
    chatMiddleware.sendAnswer(text);
  }, [chatMiddleware, text]);

  return (
    <View style={ChatInputStyles.main}>
      <TextInput style={ChatInputStyles.input} onChangeText={onChangeText} />
      <TouchableOpacity
        activeOpacity={1}
        disabled={!isValidated}
        onPress={onPress}>
        <View style={ChatInputStyles.touchable} />
      </TouchableOpacity>
    </View>
  );
};

export const ChatInput = React.memo(Input);
