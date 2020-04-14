/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {TDatePicker} from './T_DatePicker';
import {Text, View} from 'react-native';
import {DatePickerStyles} from './S_DatePicker';
import ScrollPicker from '../../../libs/scroll-picker/scroll-picker';
import {
  YEARS,
  MONTHS,
  MONTHS_NUMBERS,
  getDays,
} from '../../../utils/helpers/date';
import moment from 'moment';

export const DatePicker: React.FC<TDatePicker> = ({
  onSaveDate,
  viewStyles: {answerFieldColor, buttonColor},
  mode = 'bornDate',
}) => {
  const [month, setMonth] = React.useState('01');
  const [year, setYear] = React.useState('1910');
  const [day, setDay] = React.useState('01');

  const daysInCurentMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();

  React.useEffect(() => {
    onSaveDate({month, year, day});
  }, [month, year, day, onSaveDate]);

  const DAYS = getDays(daysInCurentMonth);
  return (
    <View style={DatePickerStyles.main}>
      <View
        style={{
          height: 100,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{width: mode === 'bornDate' ? '30%' : '46%'}}>
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
            onValueChange={(_month: string) =>
              setMonth(MONTHS_NUMBERS[MONTHS.indexOf(_month)])
            }
          />
        </View>
        {mode === 'bornDate' ? (
          <View style={{width: '30%'}}>
            <ScrollPicker
              dataSource={DAYS}
              selectedIndex={0}
              itemHeight={40}
              wrapperHeight={100}
              wrapperColor={answerFieldColor}
              highlightColor={buttonColor}
              renderItem={(
                data: string,
                index: number,
                isSelected: boolean,
              ) => (
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
          </View>
        ) : (
          <></>
        )}
        <View style={{width: mode === 'bornDate' ? '30%' : '46%'}}>
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
    </View>
  );
};
