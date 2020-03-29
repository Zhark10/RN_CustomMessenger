import React, {FC} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ChatPhotoStyles} from './S_ChatPhoto';
import {TChatProps} from '../../../types';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatPhoto: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData}) => {
    const onPress = React.useCallback(() => {
      chatMiddleware.sendAnswer('hereWillBePhotoToBase64');
    }, [chatMiddleware]);

    const {chatBackgroundColor, buttonColor} = libraryInputData.viewStyles;

    return (
      <View
        style={[ChatPhotoStyles.main, {backgroundColor: chatBackgroundColor}]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={[ChatPhotoStyles.button, {borderColor: buttonColor}]}>
          <Icon name="camera" size={28} color={buttonColor} />
        </TouchableOpacity>
      </View>
    );
  },
);

export default ChatPhoto;
