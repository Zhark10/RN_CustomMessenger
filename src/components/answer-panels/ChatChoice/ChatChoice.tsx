import React, {FC} from 'react';
import {View, CheckBox, Text, Alert} from 'react-native';
import {ChatChoiceStyles} from './S_ChatChoice';
import {TChatProps} from '../../../types';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';

const Choice: FC<TChatProps> = ({libraryInputData, chatMiddleware}) => {
  return (
    <View style={ChatChoiceStyles.main}>
      {chatMiddleware!.currentChatBotQuestion!.myAnswer!.CHOICE!.checkboxTitles!.map(
        title => (
          <View style={ChatChoiceStyles.checkboxBlock}>
            <CheckBox value={true} disabled={false} />
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
