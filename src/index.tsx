/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import Animated from 'react-native-reanimated';
import {KeyboardAvoidingView, View} from 'react-native';

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
} from './components/answer-panels/exports';

export const MessangerStack: FC<TLibraryInputData> = libraryInputData => {
  const chatMiddleware = useChatMiddleware(libraryInputData);
  const {
    currentChatBotQuestion: {myAnswer},
    answerFieldVisible,
    setAnswerFieldVisible,
  } = chatMiddleware;
  const myAnswerType = Object.getOwnPropertyNames(myAnswer)[0];

  const answerSize = getAnswerSize(myAnswer);
  const answerFieldAnimation = useAnswerFieldAnimation(
    answerFieldVisible,
    answerSize,
  );

  React.useEffect(() => {
    const setVisibleByTime = setTimeout(
      () => setAnswerFieldVisible(true),
      2000,
    );
    return () => clearTimeout(setVisibleByTime);
  }, [answerFieldVisible]);

  const selectAnswerField = (): React.ReactNode => {
    const answerFields = {
      [EAnswerType.INPUT]: ChatInput,
      [EAnswerType.MULTICHOICE]: ChatMultichoice,
      [EAnswerType.CHOICE]: ChatChoice,
      [EAnswerType.PHOTO]: ChatPhoto,
      [EAnswerType.DATEPICKER]: ChatInput,
    };
    const AnswerField = answerFields[myAnswerType];
    const chatProps: TChatProps = {chatMiddleware, libraryInputData};
    return <AnswerField {...chatProps} />;
  };

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : undefined}
      style={{flex: 1}}>
      <View style={{flex: 1}} />
      <Animated.View
        style={[MainStyles.main, {height: answerFieldAnimation.offsetValue}]}>
        {answerFieldVisible && selectAnswerField()}
      </Animated.View>
    </KeyboardAvoidingView>
  );
};
