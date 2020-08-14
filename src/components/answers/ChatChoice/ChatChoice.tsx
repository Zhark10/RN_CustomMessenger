/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {ChatChoiceStyles} from './S_ChatChoice';
import {TChatProps, TCheckboxData} from '../../../types';
import ScrollPicker from '../../../libs/scroll-picker/ScrollPicker';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';
import {EBubbleType} from '../../../utils/hooks/USE_ChatMiddleware';

const ChatChoice: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData}) => {
    const {
      checkboxTitles,
      endFunc,
    } = chatMiddleware!.currentChatBotQuestion!.myAnswer!.CHOICE!;
    const {answerFieldColor, buttonColor} = libraryInputData.viewStyles;
    const [selected, refreshSelected] = React.useState<TCheckboxData>(
      checkboxTitles[0],
    );
    const onValueChange = (item: TCheckboxData) => {
      refreshSelected(item);
    };

    const onPress = React.useCallback(() => {
      chatMiddleware.sendAnswer(
        selected.checkboxTitle.toUpperCase(),
        EBubbleType.TEXT,
      );
      endFunc(selected.key);
    }, [chatMiddleware, endFunc, selected.checkboxTitle, selected.key]);

    return (
      <View style={ChatChoiceStyles.main}>
        <View style={ChatChoiceStyles.scrollPickerWrapper}>
          <ScrollPicker
            dataSource={checkboxTitles}
            selectedIndex={0}
            itemHeight={40}
            wrapperHeight={100}
            wrapperColor={answerFieldColor}
            highlightColor={buttonColor}
            renderItem={(data: TCheckboxData, isSelected: boolean) => (
              <Text
                style={[
                  ChatChoiceStyles.scrollPickerText,
                  {color: isSelected ? '#4F4E4E' : '#C3C3C3'},
                ]}>
                {data.checkboxTitle.toUpperCase()}
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
