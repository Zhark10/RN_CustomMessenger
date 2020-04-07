import React, {FC} from 'react';
import {View} from 'react-native';
import {ChatButtonStyles} from './S_ChatButton';
import {TChatProps} from '../../../types';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';
import {EBubbleType} from '../../../../src/utils/hooks/USE_ChatMiddleware';

const ChatButton: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData}) => {
    const title = chatMiddleware!.currentChatBotQuestion!.myAnswer!.BUTTON!
      .title!;
    const onPress = React.useCallback(() => {
      chatMiddleware.sendAnswer(title, EBubbleType.TEXT);
    }, [chatMiddleware, title]);

    const {answerFieldColor, buttonColor} = libraryInputData.viewStyles;

    return (
      <View style={ChatButtonStyles.main}>
        <ButtonComponent
          title={title}
          fontFamily="Roboto"
          mainColor={buttonColor}
          secondColor={answerFieldColor}
          onPress={onPress}
          type="light"
        />
      </View>
    );
  },
);

export default ChatButton;
