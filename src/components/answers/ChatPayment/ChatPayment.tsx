import React, {FC} from 'react';
import {TChatProps} from '../../../types';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';

const ChatPayment: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData, setVisibleAdditionalAnswerPanel}) => {
    const {title} = chatMiddleware!.currentChatBotQuestion!.myAnswer!.PAYMENT!;

    const onVisibleAnswerPanel = () => {
      setVisibleAdditionalAnswerPanel(true);
    };

    const {answerFieldColor, buttonColor} = libraryInputData.viewStyles;

    return (
      <ButtonComponent
        title={title}
        mainColor={buttonColor}
        secondColor={answerFieldColor}
        onPress={onVisibleAnswerPanel}
        type="light"
      />
    );
  },
);

export default ChatPayment;
