/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {TDatePicker} from './T_DatePicker';
import {Text, TextStyle, View} from 'react-native';
import {DatePickerStyles} from './S_DatePicker';
import {YEARS, MONTHS} from '../../../utils/helpers/date';
import ScrollPicker from '../../../libs/scroll-picker/scroll-picker';

export const DatePicker: React.FC<TDatePicker> = ({
  onSendDate,
  viewStyles: {answerFieldColor, buttonColor},
}) => {
  const [month, setMonth] = React.useState(0);

  return (
    <View style={DatePickerStyles.main}>
      <View
        style={{
          height: 100,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <ScrollPicker
          dataSource={MONTHS}
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
          onValueChange={() => {}}
        />
        <ScrollPicker
          dataSource={MONTHS}
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
          onValueChange={() => {}}
        />
        <ScrollPicker
          dataSource={YEARS}
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
          onValueChange={() => {}}
        />
      </View>
    </View>
  );
};
