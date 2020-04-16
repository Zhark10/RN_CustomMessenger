/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TChatProps} from '../../../types';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';
import {TextField} from 'react-native-material-textfield';
import {cc_format} from '../../../utils/helpers/format-card-number';
import {DatePicker} from '../../shared/picker/DatePicker';
import {IDate} from '../../shared/picker/T_DatePicker';
import {EBubbleType} from '../../../utils/hooks/USE_ChatMiddleware';
import {ChatPaymentAdditionalStyles} from './S_ChatPayment_Additional';
import {Icon} from 'react-native-vector-icons/Icon';

const ChatPaymentAdditional: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData, setVisibleAdditionalAnswerPanel}) => {
    const {
      title,
      endFunc,
    } = chatMiddleware!.currentChatBotQuestion!.myAnswer!.PAYMENT!;

    const [errors, refreshErrors] = useState<any>({});

    const [cardNumber, setCardNumber] = React.useState('');
    const [expirationMonth, setExpirationMonth] = React.useState('01');
    const [expirationYear, setExpirationYear] = React.useState('1910');
    const [cvc, setCvc] = React.useState('');
    const [name, setName] = React.useState('');

    const onSaveDate = ({month, year}: IDate) => {
      setExpirationMonth(month);
      setExpirationYear(year);
    };

    const saveCardNumber = (text: React.SetStateAction<string>) => {
      if (errors.cardNumber) {
        refreshErrors(({cardNumber, ...otherErrors}) => otherErrors);
      }
      setCardNumber(text);
    };

    const saveCvc = (text: React.SetStateAction<string>) => {
      if (errors.cvc) {
        refreshErrors(({cvc, ...otherErrors}) => otherErrors);
      }
      setCvc(text);
    };

    const saveName = (text: React.SetStateAction<string>) => {
      if (errors.name) {
        refreshErrors(({name, ...otherErrors}) => otherErrors);
      }
      setName(text);
    };

    const onHidePanel = useCallback(() => {
      setVisibleAdditionalAnswerPanel(false);
    }, [setVisibleAdditionalAnswerPanel]);

    const onPress = React.useCallback(() => {
      onHidePanel();
      const _cardNumber = cardNumber.replace(/[^0-9]/g, '').slice(0, 16);
      const _cvc = cvc.replace(/[^0-9]/g, '').slice(0, 3);
      const _name = name.slice(0, 50);

      if (_cardNumber.length < 16) {
        refreshErrors((currentErrors: any) => ({
          ...currentErrors,
          cardNumber: 'Недостаточно символов',
        }));
        return null;
      }

      if (_name.length < 1) {
        refreshErrors((currentErrors: any) => ({
          ...currentErrors,
          name: 'Введите имя',
        }));
        return null;
      }

      if (_cvc.length < 3) {
        refreshErrors((currentErrors: any) => ({
          ...currentErrors,
          cvc: 'Код некорректный',
        }));
        return null;
      }

      endFunc(
        {
          number: _cardNumber,
          cvc: +_cvc,
          expirationMonth: +expirationMonth,
          expirationYear: +expirationYear,
          name: _name,
        },
        async () => {
          chatMiddleware.sendAnswer([], EBubbleType.CREDIT_CARD);
        },
      );
    }, [
      cardNumber,
      chatMiddleware,
      cvc,
      endFunc,
      expirationMonth,
      expirationYear,
      name,
      onHidePanel,
    ]);

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
        <View style={ChatPaymentAdditionalStyles.form}>
          <TextField
            label="Card number"
            error={errors.cardNumber || ''}
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
            error={errors.name || ''}
            style={ChatPaymentAdditionalStyles.inputText}
            tintColor={buttonColor}
            keyboardType="ascii-capable"
            onChangeText={saveName}
            placeholderTextColor={buttonColor}
            formatText={text => cc_format(text.slice(0, 50))}
          />
          <Text style={ChatPaymentAdditionalStyles.dateTitle}>Expire date</Text>
          <View
            style={{
              paddingTop: 8,
              paddingBottom: 24,
            }}>
            <DatePicker
              onSaveDate={onSaveDate}
              mode={'creditCard'}
              viewStyles={libraryInputData.viewStyles}
            />
          </View>
          <TextField
            label="Cvc"
            error={errors.cvc || ''}
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
