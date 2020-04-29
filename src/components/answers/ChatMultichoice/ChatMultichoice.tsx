import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {ChatMultichoiceStyles} from './S_ChatMultichoice';
import {TChatProps} from '../../../types';
import CheckBox from 'react-native-check-box';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';
import {EBubbleType} from '../../../utils/hooks/USE_ChatMiddleware';

const ChatMultichoice: FC<TChatProps> = React.memo(
  ({libraryInputData, chatMiddleware}) => {
    const values = chatMiddleware!.currentChatBotQuestion!.myAnswer!
      .MULTICHOICE!.checkboxTitles!;

    const {answerFieldColor, buttonColor} = libraryInputData.viewStyles;

    const [selected, refreshSelected] = React.useState<string[]>([]);
    const onValueChange = (title: string) => {
      if (selected.some(elem => elem === title)) {
        refreshSelected(currentValues =>
          currentValues.filter(value => value !== title),
        );
      } else {
        refreshSelected(currentValues => [...currentValues, title]);
      }
    };

    const onPress = React.useCallback(() => {
      chatMiddleware.sendAnswer(selected, EBubbleType.TEXT);
    }, [chatMiddleware, selected]);
    return (
      <View style={ChatMultichoiceStyles.main}>
        {values.map(title => (
          <View key={title} style={ChatMultichoiceStyles.checkboxBlock}>
            <CheckBox
              onClick={() => onValueChange(title)}
              isChecked={selected.some(elem => elem === title)}
              disabled={false}
              checkedCheckBoxColor={buttonColor}
              uncheckedCheckBoxColor={'#797979'}
            />
            <Text style={ChatMultichoiceStyles.checkboxText}>{title}</Text>
          </View>
        ))}
        <ButtonComponent
          title={'ОК'}
          mainColor={buttonColor}
          secondColor={answerFieldColor}
          onPress={onPress}
          type="light"
        />
      </View>
    );
  },
);

export default ChatMultichoice;
