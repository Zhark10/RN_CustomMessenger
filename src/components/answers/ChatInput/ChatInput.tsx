import React, {FC} from 'react';
import {TextInput, View} from 'react-native';
import {ChatInputStyles} from './S_ChatInput';
import {TChatProps} from '../../../types';
import SimpleToast from 'react-native-simple-toast';
import {EBubbleType} from '../../../utils/hooks/USE_ChatMiddleware';

const ChatInput: FC<TChatProps> = React.memo(({chatMiddleware}) => {
  const inputQuestionData = chatMiddleware.currentChatBotQuestion.myAnswer
    .INPUT!;
  const isNeedSended = inputQuestionData.sendAnswerOutput;
  const [text, setText] = React.useState('');
  const isValidated = text.length > 0 && text.length < 50;

  const onChangeText = React.useCallback((value: string) => setText(value), [
    setText,
  ]);

  const onEndEditing = React.useCallback(() => {
    if (isValidated) {
      chatMiddleware.sendAnswer(text, EBubbleType.TEXT, isNeedSended);
    } else {
      SimpleToast.show('Поле заполнено некорректно');
    }
  }, [chatMiddleware, isNeedSended, isValidated, text]);

  return (
    <View style={ChatInputStyles.main}>
      <TextInput
        autoFocus
        style={ChatInputStyles.input}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
      />
    </View>
  );
});

export default ChatInput;
