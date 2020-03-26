import React, {FC} from 'react';
import {View, CheckBox, Text} from 'react-native';
import {ChatChoiceStyles} from './S_ChatChoice';
import {TChatProps} from '../../../types';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';

const ChatChoice: FC<TChatProps> = React.memo(({chatMiddleware}) => {
  const [selected, refreshSelected] = React.useState<string>('');
  const values = chatMiddleware!.currentChatBotQuestion!.myAnswer!.CHOICE!
    .checkboxTitles!;

  const onValueChange = (title: string) => {
    if (selected === title) {
      refreshSelected('');
    } else {
      refreshSelected(title);
    }
  };

  const onPress = React.useCallback(() => {
    chatMiddleware.sendAnswer(selected);
  }, [chatMiddleware, selected]);
  return (
    <View style={ChatChoiceStyles.main}>
      {values.map(title => (
        <View key={title} style={ChatChoiceStyles.checkboxBlock}>
          <CheckBox
            onValueChange={() => onValueChange(title)}
            value={selected === title}
            disabled={false}
          />
          <Text style={ChatChoiceStyles.checkboxText}>{title}</Text>
        </View>
      ))}
      <ButtonComponent
        title={'ОК'}
        fontFamily="Roboto"
        mainColor="red"
        secondColor="white"
        onPress={onPress}
        type="light"
      />
    </View>
  );
});

export default ChatChoice;
