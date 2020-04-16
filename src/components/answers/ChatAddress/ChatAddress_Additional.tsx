/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {TChatProps} from '../../../types';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';
import {EBubbleType} from '../../../utils/hooks/USE_ChatMiddleware';
import {PlaceInput} from '../../shared/place-input/PlaceInput';
import {ChatAddressAdditionalStyles} from './S_ChatAddress_Additional';
import {Icon} from 'react-native-vector-icons/Icon';

const ChatAddressAdditional: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData, setVisibleAdditionalAnswerPanel}) => {
    const {title} = chatMiddleware!.currentChatBotQuestion!.myAnswer!.ADDRESS!;

    const [address, setAddress] = React.useState('');
    const [error, setError] = React.useState(false);

    const onHidePanel = useCallback(() => {
      setVisibleAdditionalAnswerPanel(false);
    }, [setVisibleAdditionalAnswerPanel]);

    const onPress = React.useCallback(() => {
      if (address.length > 0) {
        onHidePanel();
        chatMiddleware.sendAnswer(address, EBubbleType.TEXT);
      } else {
        setError(true);
      }
    }, [address, chatMiddleware, onHidePanel]);

    const {answerFieldColor, buttonColor} = libraryInputData.viewStyles;

    return (
      <View
        style={[
          ChatAddressAdditionalStyles.main,
          {backgroundColor: answerFieldColor},
        ]}>
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
        <View style={ChatAddressAdditionalStyles.content}>
          <PlaceInput
            error={error}
            setError={setError}
            type={'Country'}
            viewStyles={libraryInputData.viewStyles}
            setAddress={setAddress}
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

export default ChatAddressAdditional;
