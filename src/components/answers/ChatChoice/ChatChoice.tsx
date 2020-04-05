import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {ChatChoiceStyles} from './S_ChatChoice';
import {TChatProps} from '../../../types';
import CheckBox from 'react-native-check-box';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';
import {EBubbleType} from '../../../../../chat/src/utils/hooks/USE_ChatMiddleware';

const ChatChoice: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData}) => {
    const values = chatMiddleware!.currentChatBotQuestion!.myAnswer!.CHOICE!
      .checkboxTitles!;
    const [selected, refreshSelected] = React.useState<string>(values[0]);

    const {answerFieldColor, buttonColor} = libraryInputData.viewStyles;

    const onValueChange = (title: string) => {
      if (selected === title) {
        refreshSelected('');
      } else {
        refreshSelected(title);
      }
    };

    const onPress = React.useCallback(() => {
      chatMiddleware.sendAnswer(selected.toUpperCase(), EBubbleType.TEXT);
    }, [chatMiddleware, selected]);

    return (
      <View style={ChatChoiceStyles.main}>
        {values.map(title => (
          <View key={title} style={ChatChoiceStyles.checkboxBlock}>
            <CheckBox
              onClick={() => onValueChange(title)}
              isChecked={selected === title}
              disabled={false}
              checkedCheckBoxColor={buttonColor}
              uncheckedCheckBoxColor={'#797979'}
            />
            <Text style={ChatChoiceStyles.checkboxText}>{title}</Text>
          </View>
        ))}
        <ButtonComponent
          title={'ОК'}
          fontFamily="Roboto"
          mainColor={buttonColor}
          secondColor={answerFieldColor}
          onPress={onPress}
          type="light"
        />
      </View>
    );
  },
);

export default ChatChoice;
