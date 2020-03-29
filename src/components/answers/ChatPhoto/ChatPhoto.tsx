import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChatPhotoStyles } from './S_ChatPhoto';
import { TChatProps } from '../../../types';
import { ButtonComponent } from '../../shared/buttons/ButtonComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatPhoto: FC<TChatProps> = React.memo(
  ({ chatMiddleware, libraryInputData }) => {
    const onPress = React.useCallback(() => {
      chatMiddleware.sendAnswer('hereWillBePhotoToBase64');
    }, [chatMiddleware]);

    const { answerFieldColor, chatBackgroundColor } = libraryInputData.viewStyles;

    return (
      <View
        style={[ChatPhotoStyles.main, { backgroundColor: chatBackgroundColor }]}>
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={[ChatPhotoStyles.button, { borderColor: answerFieldColor }]}>
          <Icon name="camera" size={28} color={answerFieldColor} />
        </TouchableOpacity>
      </View>
    );
  },
);

export default ChatPhoto;
