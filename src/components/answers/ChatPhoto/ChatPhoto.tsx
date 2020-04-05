import React, {FC} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ChatPhotoStyles} from './S_ChatPhoto';
import {TChatProps} from '../../../types';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatPhoto: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData}) => {
    const photoQuestionData = chatMiddleware.currentChatBotQuestion.myAnswer
      .PHOTO!;
    const isOnlyPhoto = photoQuestionData.numbersOfPhoto === 'one';
    const {sendPhotos} = usePhotoService(
      data => {
        if (isOnlyPhoto) {
          chatMiddleware.sendAnswer(data, EBubbleType.PHOTO);
        } else {
          chatMiddleware.sendAnswer(data, EBubbleType.DOUBLE_PHOTO);
        }
      },
      photoQuestionData.startFunc,
      photoQuestionData.endFunc,
    );

    const onPress = React.useCallback(() => {
      if (isOnlyPhoto) {
        sendPhotos(1);
      } else {
        sendPhotos(2);
      }
    }, [isOnlyPhoto, sendPhotos]);

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
