import React, {FC} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {ChatInputStyles} from './S_ChatInput';
import {TChatProps} from '../../../types';

const ChatInput: FC<TChatProps> = React.memo(({chatMiddleware}) => {
  const [text, setText] = React.useState('');
  const isValidated = text.length > 0 && text.length < 50;

  const onChangeText = React.useCallback(
    (value: string) => {
      isValidated && setText(value);
    },
    [isValidated],
  );

  const onEndEditing = React.useCallback(() => {
    chatMiddleware.sendAnswer(text);
  }, [chatMiddleware, text]);

  return (
    <View style={ChatInputStyles.main}>
      <TextInput
        style={ChatInputStyles.input}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
      />
    </View>
  );
});

export default ChatInput;
