/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {TChatProps} from '../../../types';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';
import {TextField} from 'react-native-material-textfield';
import {cc_format} from '../../../utils/helpers/format-card-number';
import {DatePicker} from '../../shared/picker/DatePicker';
import CheckBox from 'react-native-check-box';
import {ChatPaymentAdditionalStyles} from './S_ChatPayment_Additional';
import {USE_PaymentMethod} from '../../../utils/hooks/USE_Payment';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isIos} from '../../../utils/helpers/platform';
import {screenHeight} from '../../../utils/helpers/screen';

const ChatPaymentAdditional: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData, setVisibleAdditionalAnswerPanel}) => {
    const values = ['Карта', 'Счет'];
    const {
      title,
      endFuncForBankAccount,
      endFuncForCreditCard,
    } = chatMiddleware!.currentChatBotQuestion!.myAnswer!.PAYMENT!;
    const [selected, refreshSelected] = React.useState<string>(values[0]);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const isCreditCard = selected === values[0];

    const onValueChange = (text: string) => {
      if (selected !== text) {
        refreshSelected(text);
      }
    };

    const onHidePanel = useCallback(() => {
      setVisibleAdditionalAnswerPanel(false);
    }, [setVisibleAdditionalAnswerPanel]);

    const {
      saveDate,
      saveCardNumber,
      saveCvc,
      saveName,
      creditErrors,
      sendCardInfo,
    } = USE_PaymentMethod.useCreditCard(
      chatMiddleware,
      endFuncForCreditCard,
      onHidePanel,
    );

    const {
      saveAccountNumber,
      saveBankNumber,
      bankErrors,
      sendBankInfo,
    } = USE_PaymentMethod.useBankAccount(
      chatMiddleware,
      endFuncForBankAccount,
      onHidePanel,
    );

    const onPress = () => {
      if (isCreditCard) {
        sendCardInfo();
      } else {
        sendBankInfo();
      }
    };

    React.useEffect(() => {
      const keyboardShowListener = isIos
        ? 'keyboardWillShow'
        : 'keyboardDidShow';
      const keyboardHideListener = isIos
        ? 'keyboardWillHide'
        : 'keyboardDidHide';
      const keyboardDidShowListener = Keyboard.addListener(
        keyboardShowListener,
        () => {
          setKeyboardVisible(true);
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        keyboardHideListener,
        () => {
          setKeyboardVisible(false);
        },
      );
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);

    const {answerFieldColor, buttonColor} = libraryInputData.viewStyles;

    return (
      <View style={ChatPaymentAdditionalStyles.main}>
        <View
          style={{
            backgroundColor: '#ffffff',
            height: 64,
            width: '100%',
            opacity: 0.8,
            top: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={onHidePanel}
            style={{
              width: 32,
              height: 32,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              style={{
                fontSize: 32,
                color: '#4F4E4E',
              }}
              name="close"
            />
          </TouchableOpacity>
        </View>
        {values.map(text => (
          <TouchableWithoutFeedback
            onPress={() => onValueChange(text)}
            key={text}>
            <View style={ChatPaymentAdditionalStyles.checkboxBlock}>
              <CheckBox
                onClick={() => onValueChange(text)}
                isChecked={text === selected}
                disabled={false}
                checkedCheckBoxColor={buttonColor}
                uncheckedCheckBoxColor={'#797979'}
              />
              <Text style={ChatPaymentAdditionalStyles.checkboxText}>
                {text}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
        <View
          style={isKeyboardVisible ? {height: screenHeight / 2} : {flex: 1}}>
          <ScrollView style={ChatPaymentAdditionalStyles.form}>
            {isCreditCard ? (
              <View style={{paddingBottom: isKeyboardVisible ? 48 : 0}}>
                <TextField
                  label="Card number"
                  error={creditErrors.cardNumber || ''}
                  style={ChatPaymentAdditionalStyles.inputText}
                  tintColor={buttonColor}
                  keyboardType="numeric"
                  onChangeText={saveCardNumber}
                  formatText={text =>
                    cc_format(text.replace(/[^0-9]/g, '').slice(0, 16))
                  }
                  placeholderTextColor={buttonColor}
                />
                <TextField
                  label="Full name"
                  error={creditErrors.name || ''}
                  style={ChatPaymentAdditionalStyles.inputText}
                  tintColor={buttonColor}
                  keyboardType="email-address"
                  onChangeText={saveName}
                  placeholderTextColor={buttonColor}
                  formatText={text => cc_format(text.slice(0, 50))}
                />
                <Text style={ChatPaymentAdditionalStyles.dateTitle}>
                  Expire date
                </Text>
                <View
                  style={{
                    paddingTop: 8,
                    paddingBottom: 24,
                  }}>
                  <DatePicker
                    onSaveDate={saveDate}
                    mode={'creditCard'}
                    viewStyles={libraryInputData.viewStyles}
                  />
                </View>
                <TextField
                  label="Cvc"
                  error={creditErrors.cvc || ''}
                  style={ChatPaymentAdditionalStyles.inputText}
                  tintColor={buttonColor}
                  keyboardType="numeric"
                  onChangeText={saveCvc}
                  formatText={text =>
                    cc_format(text.replace(/[^0-9]/g, '').slice(0, 3))
                  }
                  placeholderTextColor={buttonColor}
                />
              </View>
            ) : (
              <View>
                <TextField
                  label="Номер счета"
                  error={bankErrors.cardNumber || ''}
                  style={ChatPaymentAdditionalStyles.inputText}
                  tintColor={buttonColor}
                  keyboardType="numeric"
                  onChangeText={saveAccountNumber}
                  formatText={text =>
                    cc_format(text.replace(/[^0-9]/g, '').slice(0, 16))
                  }
                  placeholderTextColor={buttonColor}
                />
                <TextField
                  label="БИК банка получателя"
                  error={bankErrors.cardNumber || ''}
                  style={ChatPaymentAdditionalStyles.inputText}
                  tintColor={buttonColor}
                  keyboardType="numeric"
                  onChangeText={saveBankNumber}
                  formatText={text =>
                    cc_format(text.replace(/[^0-9]/g, '').slice(0, 16))
                  }
                  placeholderTextColor={buttonColor}
                />
              </View>
            )}
          </ScrollView>
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

export default ChatPaymentAdditional;
