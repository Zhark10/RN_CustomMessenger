import React, {FC} from 'react';
import Animated from 'react-native-reanimated';
import {KeyboardAvoidingView, View, Alert} from 'react-native';

import {TLibraryInputData} from './types/T_LibraryInputData';
import {EAnswerType, TChatProps} from './types';
import {isIos} from './utils/helpers/platform';
import {getAnswerSize} from './utils/helpers/answer-panel-size-detect';

import {useChatMiddleware} from './utils/hooks/USE_ChatMiddleware';
import {useAnswerFieldAnimation} from './utils/hooks/USE_AnswerFieldAnimation';
import {MainStyles} from './styles';
import {
  ChatInput,
  ChatMultichoice,
  ChatChoice,
  ChatPhoto,
} from './components/answers/exports';
import MessagesField from './components/messages/MessagesField/MessagesField';

export const MessangerStack: FC<TLibraryInputData> = libraryInputData => {
  const chatMiddleware = useChatMiddleware(libraryInputData);
  const {
    currentChatBotQuestion: {myAnswer},
    answerFieldVisible,
  } = chatMiddleware;

  const chatProps: TChatProps = {chatMiddleware, libraryInputData};
  const answerSize = getAnswerSize(myAnswer);
  const answerFieldAnimation = useAnswerFieldAnimation(
    answerFieldVisible,
    answerSize,
  );

  const selectAnswerField = (): React.ReactNode => {
    const myAnswerType = Object.getOwnPropertyNames(myAnswer)[0];
    const answerFields = {
      [EAnswerType.INPUT]: ChatInput,
      [EAnswerType.MULTICHOICE]: ChatMultichoice,
      [EAnswerType.CHOICE]: ChatChoice,
      [EAnswerType.PHOTO]: ChatPhoto,
      [EAnswerType.DATEPICKER]: ChatInput,
    };
    const AnswerField = answerFields[myAnswerType];
    return <AnswerField {...chatProps} />;
  };

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : undefined}
      style={MainStyles.main}>
      <MessagesField {...chatProps} />
      <Animated.View
        style={[MainStyles.anim, {height: answerFieldAnimation.offsetValue}]}>
        {answerFieldVisible && selectAnswerField()}
      </Animated.View>
    </KeyboardAvoidingView>
  );
};
