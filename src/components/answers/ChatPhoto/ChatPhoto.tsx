import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {ChatPhotoStyles} from './S_ChatPhoto';
import {TChatProps} from '../../../types';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';

const ChatPhoto: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData}) => {
    const onPress = React.useCallback(() => {
      chatMiddleware.sendAnswer('hereWillBePhotoToBase64');
    }, [chatMiddleware]);

    const {answerFieldColor, chatBackgroundColor} = libraryInputData.viewStyles;

    return (
      <View style={ChatPhotoStyles.main}>
        <Text>Photo form</Text>
        <ButtonComponent
          title={'ОК'}
          fontFamily="Roboto"
          mainColor={chatBackgroundColor}
          secondColor={answerFieldColor}
          onPress={onPress}
          type="light"
        />
      </View>
    );
  },
);

export default ChatPhoto;
