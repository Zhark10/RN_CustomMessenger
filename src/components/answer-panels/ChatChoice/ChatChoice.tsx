import React, { FC } from 'react';
import { View, CheckBox, Text, Alert } from 'react-native';
import { ChatChoiceStyles } from './S_ChatChoice';
import { TChatProps } from '../../../types';
import { ButtonComponent } from '../../shared/buttons/ButtonComponent';

type ICheckbox = {
  key: string;
  checked: boolean;
};

const Choice: FC<TChatProps> = ({ libraryInputData, chatMiddleware }) => {
  const [selected, refreshSelected] = React.useState<ICheckbox[]>([]);

  const onValueChange = (key: string) => {
    if (selected.find(current => key === current.key)) {
      refreshSelected([]);
    } else {
      refreshSelected([{checked: true, key}]);
    }
  };

  return (
    <View style={ChatChoiceStyles.main}>
      {chatMiddleware!.currentChatBotQuestion!.myAnswer!.CHOICE!.checkboxTitles!.map(
        title => (
          <View key={title} style={ChatChoiceStyles.checkboxBlock}>
            <CheckBox
              onValueChange={() => onValueChange(title)}
              value={!!selected.find(current => title === current.key)}
              disabled={false}
            />
            <Text style={ChatChoiceStyles.checkboxText}>{title}</Text>
          </View>
        ),
      )}
      <ButtonComponent
        title={'ОК'}
        fontFamily="Roboto"
        mainColor="red"
        secondColor="white"
        onPress={() => Alert.alert('it`s pressed')}
        type="light"
      />
    </View>
  );
};

export const ChatChoice = React.memo(Choice);
