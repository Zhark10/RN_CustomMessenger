import React, {FC} from 'react';
import {View, CheckBox, Text, Alert} from 'react-native';
import {ChatMultichoiceStyles} from './S_ChatMultichoice';
import {TChatProps} from '../../../types';
import {ButtonComponent} from '../../../components/shared/buttons/ButtonComponent';

const ChatMultichoice: FC<TChatProps> = React.memo(
  ({libraryInputData, chatMiddleware}) => {
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
  },
);

export default ChatMultichoice;
