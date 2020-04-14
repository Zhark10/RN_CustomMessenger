import React, {FC} from 'react';
import {View} from 'react-native';
import {ChatDatepickerStyles} from './S_ChatDatepicker';
import {TChatProps} from '../../../types';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';
import {EBubbleType} from '../../../utils/hooks/USE_ChatMiddleware';
import {DatePicker} from '../../shared/picker/DatePicker';
import {IDate} from '../../shared/picker/T_DatePicker';
import {MONTHS} from '../../../utils/helpers/date';

const ChatDatepicker: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData}) => {
    const {
      title,
      endFunc,
    } = chatMiddleware!.currentChatBotQuestion!.myAnswer!.DATEPICKER!;
    const [bornMonth, setBornMonth] = React.useState('01');
    const [bornDay, setBornDay] = React.useState('01');
    const [bornYear, setBornYear] = React.useState('1910');

    const onSaveDate = ({month, year, day}: IDate) => {
      setBornMonth(month);
      setBornYear(year);
      setBornDay(day!);
    };

    const onPress = React.useCallback(() => {
      const formatedAnswer = `${bornDay} ${MONTHS[+bornMonth - 1]} ${bornYear}`;
      chatMiddleware.sendAnswer(formatedAnswer, EBubbleType.TEXT);
      endFunc({
        month: bornMonth,
        year: bornYear,
        day: bornDay,
      });
    }, [bornDay, bornMonth, bornYear, chatMiddleware, endFunc]);

    const {answerFieldColor, buttonColor} = libraryInputData.viewStyles;

    return (
      <View style={ChatDatepickerStyles.main}>
        <View style={ChatDatepickerStyles.datePicker}>
          <DatePicker
            onSaveDate={onSaveDate}
            mode={'bornDate'}
            viewStyles={libraryInputData.viewStyles}
          />
        </View>
        <ButtonComponent
          title={title}
          mainColor={buttonColor}
          secondColor={answerFieldColor}
          onPress={onPress}
          type="light"
        />
      </View>
    );
  },
);

export default ChatDatepicker;
