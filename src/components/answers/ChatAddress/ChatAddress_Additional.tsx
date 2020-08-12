import React, {FC} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {TChatProps} from '../../../types';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';
import {ChatAddressAdditionalStyles} from './S_ChatAddress_Additional';
import {TextField} from 'react-native-material-textfield';
import {USE_Address} from '../../../utils/hooks/USE_AddressChecking';
import {
  screenHeight,
  getBottomSpace,
  screenWidth,
} from '../../../utils/helpers/screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useKeyboardStatus} from '../../../utils/hooks/USE_KeyboardStatus';

const ChatAddressAdditional: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData, setVisibleAdditionalAnswerPanel}) => {
    const {answerFieldColor, buttonColor} = libraryInputData.viewStyles;
    const {
      states,
      onHidePanel,
      title,
      getPlaceByFields,
      isNeedToFill,
    } = USE_Address.useAddressChecking(
      chatMiddleware,
      setVisibleAdditionalAnswerPanel,
    );

    const {keyboardHeight, keyboardShow} = useKeyboardStatus();

    const headerHeight = 64;
    const buttonContainerHeight = 48 + 16 + 16;
    const customYOffset = 20;

    return (
      <View
        style={[
          ChatAddressAdditionalStyles.main,
          {backgroundColor: answerFieldColor, height: screenHeight},
        ]}>
        <View style={ChatAddressAdditionalStyles.header}>
          <TouchableOpacity
            onPress={onHidePanel}
            style={ChatAddressAdditionalStyles.closeButton}>
            <Icon style={ChatAddressAdditionalStyles.closeIcon} name="close" />
          </TouchableOpacity>
        </View>
        <View
          style={
            keyboardShow
              ? {
                  height:
                    screenHeight -
                    keyboardHeight -
                    headerHeight -
                    buttonContainerHeight -
                    getBottomSpace(),
                }
              : {flex: 1}
          }>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: keyboardShow ? buttonContainerHeight : 0,
            }}>
            <TextField
              label={'Страна*'}
              error={
                isNeedToFill && states.country.length === 0 ? 'Поле обязательное' : ''
              }
              style={ChatAddressAdditionalStyles.inputText}
              tintColor={buttonColor}
              keyboardType="default"
              onChangeText={states.saveCountry}
              placeholderTextColor={buttonColor}
            />
            <TextField
              label={'Город*'}
              error={
                isNeedToFill && states.city.length === 0 ? 'Поле обязательное' : ''
              }
              style={ChatAddressAdditionalStyles.inputText}
              tintColor={buttonColor}
              keyboardType="default"
              onChangeText={states.saveCity}
              placeholderTextColor={buttonColor}
            />
            <TextField
              label={'Улица*'}
              error={
                isNeedToFill && states.street.length === 0 ? 'Поле обязательное' : ''
              }
              style={ChatAddressAdditionalStyles.inputText}
              tintColor={buttonColor}
              keyboardType="default"
              onChangeText={states.saveStreet}
              placeholderTextColor={buttonColor}
            />
            <TextField
              label={'Дом*'}
              error={
                isNeedToFill && states.house.length === 0 ? 'Поле обязательное' : ''
              }
              style={ChatAddressAdditionalStyles.inputText}
              tintColor={buttonColor}
              keyboardType="default"
              onChangeText={states.saveHouse}
              placeholderTextColor={buttonColor}
            />
            <TextField
              label={'Квартира'}
              style={ChatAddressAdditionalStyles.inputText}
              tintColor={buttonColor}
              keyboardType="default"
              onChangeText={states.saveApartment}
              placeholderTextColor={buttonColor}
            />
            <TextField
              label={'Индекс*'}
              error={
                isNeedToFill && states.postCode.length === 0 ? 'Поле обязательное' : ''
              }
              style={ChatAddressAdditionalStyles.inputText}
              tintColor={buttonColor}
              keyboardType="default"
              onChangeText={states.savePostCode}
              placeholderTextColor={buttonColor}
            />
          </ScrollView>
        </View>
        <ButtonComponent
          style={{
            position: 'absolute',
            bottom: getBottomSpace() + keyboardHeight + customYOffset,
            width: screenWidth - 16,
          }}
          title={title}
          mainColor={buttonColor}
          secondColor={answerFieldColor}
          onPress={getPlaceByFields}
          type="light"
        />
      </View>
    );
  },
);

export default ChatAddressAdditional;
