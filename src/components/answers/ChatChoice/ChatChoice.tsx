/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {ChatChoiceStyles} from './S_ChatChoice';
import {TChatProps} from '../../../types';
import ScrollPicker from '../../../libs/scroll-picker/scroll-picker';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';
import {EBubbleType} from '../../../utils/hooks/USE_ChatMiddleware';

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
        <View
          style={{
            height: 100,
            alignItems: 'center',
          }}>
          <ScrollPicker
            dataSource={values}
            selectedIndex={0}
            itemHeight={40}
            wrapperHeight={100}
            wrapperColor={answerFieldColor}
            highlightColor={buttonColor}
            renderItem={(data: string, index: number, isSelected: boolean) => (
              <Text
                style={{
                  fontFamily: 'Circe-Regular',
                  fontSize: 20,
                  color: isSelected ? '#4F4E4E' : '#C3C3C3',
                }}>
                {data}
              </Text>
            )}
            onValueChange={onValueChange}
          />
        </View>

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

export default ChatChoice;
