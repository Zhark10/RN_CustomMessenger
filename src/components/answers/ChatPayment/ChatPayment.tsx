import React, { FC, useRef } from 'react';
import { View, Text } from 'react-native';
import { ChatPaymentStyles } from './S_ChatPayment';
import { TChatProps } from '../../../types';
import { EBubbleType } from '../../../utils/hooks/USE_ChatMiddleware';
import { ButtonComponent } from '../../shared/buttons/ButtonComponent';
import { TextField } from 'react-native-material-textfield';
import { cc_format } from '../../../utils/helpers/format-card-number';
import { DatePicker } from '../../shared/picker/DatePicker';

const ChatPayment: FC<TChatProps> = React.memo(
  ({ chatMiddleware, libraryInputData }) => {
    const title = chatMiddleware!.currentChatBotQuestion!.myAnswer!.PAYMENT!
      .title!;

    const cardRef = useRef<TextField>(null);
    const cvvRef = useRef<TextField>(null);
    const [cardNumber, setCardNumber] = React.useState('');
    const [expireDate, setExpireDate] = React.useState('');
    const [cvv, setCvv] = React.useState('');
    const isValidate = cardNumber && expireDate && cvv;

    React.useEffect(() => {
      cardRef?.current?.setValue(cc_format(cardNumber));
    }, [cardNumber])

    React.useEffect(() => {
      cvvRef?.current?.setValue(cvv.slice(0,3));
    }, [cvv])

    const onPress = React.useCallback(() => {
      if (isValidate) {
        chatMiddleware.sendAnswer(title, EBubbleType.TEXT);
      }
    }, [chatMiddleware, isValidate, title]);

    const { answerFieldColor, buttonColor } = libraryInputData.viewStyles;

    return (
      <View style={ChatPaymentStyles.main}>
        <View style={ChatPaymentStyles.form}>
          <TextField
            label="Card number"
            ref={cardRef}
            style={ChatPaymentStyles.inputText}
            tintColor={buttonColor}
            keyboardType="numeric"
            onChangeText={setCardNumber}
            placeholderTextColor={buttonColor}
          />
          <Text style={ChatPaymentStyles.dateTitle}>Expire date</Text>
          <DatePicker
          onSendDate={()=>{}}
          viewStyles={libraryInputData.viewStyles}
          />
          <TextField
            label="CVV"
            ref={cvvRef}
            style={ChatPaymentStyles.inputText}
            tintColor={buttonColor}
            keyboardType="numeric"
            onChangeText={setCvv}
            placeholderTextColor={buttonColor}
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

export default ChatPayment;
