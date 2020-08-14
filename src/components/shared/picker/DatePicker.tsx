import * as React from 'react'
import { TDatePicker } from './T_DatePicker'
import { Text, View } from 'react-native'
import { DatePickerStyles } from './S_DatePicker'
import ScrollPicker from '../../../libs/scroll-picker/ScrollPicker'
import {
  YEARS_FOR_BORN_DATE,
  YEARS_FOR_CREDIT_CARD,
  MONTHS,
  MONTHS_NUMBERS,
  getDays,
  getMonthsByYearForCreditCard,
} from '../../../utils/helpers/date'
import moment from 'moment'

export const DatePicker: React.FC<TDatePicker> = ({
  onSaveDate,
  viewStyles: { answerFieldColor, buttonColor },
  mode = 'bornDate',
}) => {
  const isBornDatepicker = mode === 'bornDate'
  const initialYear = isBornDatepicker
    ? YEARS_FOR_BORN_DATE[YEARS_FOR_BORN_DATE.length - 1]
    : YEARS_FOR_CREDIT_CARD[YEARS_FOR_CREDIT_CARD.length - 1]
  const [month, setMonth] = React.useState('01')
  const [year, setYear] = React.useState(initialYear + '')
  const [day, setDay] = React.useState('01')

  const daysInCurentMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth()

  React.useEffect(
    function saveDate() {
      onSaveDate({ month, year, day })
    },
    [month, year, day, onSaveDate],
  )

  const DAYS = getDays(daysInCurentMonth)
  return (
    <View style={DatePickerStyles.main}>
      <View
        style={{
          height: 100,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ width: isBornDatepicker ? '30%' : '46%' }}>
          <ScrollPicker
            dataSource={isBornDatepicker ? MONTHS : getMonthsByYearForCreditCard(year)}
            selectedIndex={0}
            itemHeight={40}
            wrapperHeight={100}
            wrapperColor={answerFieldColor}
            highlightColor={buttonColor}
            renderItem={(data: string, index: number, isSelected: boolean) => (
              <Text
                style={{
                  ...DatePickerStyles.text,
                  color: isSelected ? '#4F4E4E' : '#C3C3C3',
                }}
              >
                {data}
              </Text>
            )}
            onValueChange={(_month: string) => setMonth(MONTHS_NUMBERS[MONTHS.indexOf(_month)])}
          />
        </View>
        {isBornDatepicker ? (
          <View style={{ width: '30%' }}>
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
                    ...DatePickerStyles.text,
                    color: isSelected ? '#4F4E4E' : '#C3C3C3',
                  }}
                >
                  {data}
                </Text>
              )}
              onValueChange={setDay}
            />
          </View>
        ) : (
          <></>
        )}
        <View style={{ width: isBornDatepicker ? '30%' : '46%' }}>
          <ScrollPicker
            dataSource={isBornDatepicker ? YEARS_FOR_BORN_DATE : YEARS_FOR_CREDIT_CARD}
            selectedIndex={isBornDatepicker ? YEARS_FOR_BORN_DATE.length - 1 : YEARS_FOR_CREDIT_CARD.length - 1}
            itemHeight={40}
            wrapperHeight={100}
            wrapperColor={answerFieldColor}
            highlightColor={buttonColor}
            renderItem={(data: string, index: number, isSelected: boolean) => (
              <Text
                style={{
                  ...DatePickerStyles.text,
                  color: isSelected ? '#4F4E4E' : '#C3C3C3',
                }}
              >
                {data}
              </Text>
            )}
            onValueChange={setYear}
          />
        </View>
      </View>
    </View>
  )
}
