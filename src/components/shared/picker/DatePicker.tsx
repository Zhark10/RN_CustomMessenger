/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {TDatePicker} from './T_DatePicker';
import {Text, View} from 'react-native';
import {DatePickerStyles} from './S_DatePicker';
import {
  YEARS,
  MONTHS,
  MONTHS_NUMBERS,
  getDays,
} from '../../../utils/helpers/date';
import moment from 'moment';
import ScrollPicker from '../../../libs/scroll-picker/scroll-picker';

export const DatePicker: React.FC<TDatePicker> = ({
  onSendDate,
  viewStyles: {answerFieldColor, buttonColor},
}) => {
  const [monthNumber, setMonthNumber] = React.useState('01');
  const [year, setYear] = React.useState('1914');
  const [day, setDay] = React.useState(0);

  const [DAYS, setDAYS] = React.useState(getDays(31));

  React.useEffect(() => {
    const daysInCurentMonth = moment(
      `${year}-${monthNumber}`,
      'YYYY-MM',
    ).daysInMonth();
    const days = getDays(daysInCurentMonth);
    setDAYS(days);
  }, [monthNumber, year]);

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
          onValueChange={(month: string) =>
            setMonthNumber(MONTHS_NUMBERS[MONTHS.indexOf(month)])
          }
        />
        <ScrollPicker
          dataSource={DAYS}
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
          onValueChange={setDay}
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
          onValueChange={setYear}
        />
      </View>
    </View>
  );
};
