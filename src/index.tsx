/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import Animated from 'react-native-reanimated';
import {KeyboardAvoidingView, View, Alert} from 'react-native';

import {TLibraryInputData} from './types/T_LibraryInputData';
import {EAnswerType, TChatProps} from './types';
import {isIos} from './utils/helpers/platform';
import {ChatInput} from './components/answer-panels/ChatInput/ChatInput';
import {ChatMultichoice} from './components/answer-panels/ChatMultichoice/ChatMultichoice';
import {getAnswerSize} from './utils/helpers/answer-panel-size-detect';

import {useChatMiddleware} from './utils/hooks/USE_ChatMiddleware';
import {useAnswerFieldAnimation} from './utils/hooks/USE_AnswerFieldAnimation';
import {MainStyles} from './styles';
import {ChatChoice} from './components/answer-panels/ChatChoice/ChatChoice';

export const MessangerStack: FC<TLibraryInputData> = libraryInputData => {
  const chatMiddleware = useChatMiddleware(libraryInputData);
  const {
    messageIndex,
    currentChatBotQuestion: {myAnswer},
    answerFieldVisible,
    setAnswerFieldVisible,
    savedChatInfo,
  } = chatMiddleware;
  const myAnswerType = Object.keys(myAnswer)[0];
  const isChoice = myAnswerType === EAnswerType.CHOICE;
  const isMultichoice = myAnswerType === EAnswerType.MULTICHOICE;
  const numberOfButtons = isChoice
    ? myAnswer.CHOICE!.checkboxTitles!.length
    : isMultichoice
    ? myAnswer.MULTICHOICE!.checkboxTitles!.length
    : 0;

  const answerSize = getAnswerSize(myAnswerType, numberOfButtons);
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

  React.useEffect(() => {
    const isLastMessageInModel =
      messageIndex === libraryInputData.messages.length - 1;

    if (isLastMessageInModel) {
      libraryInputData.events.endConversationEvent(savedChatInfo);
    }
  }, [messageIndex]);

  const selectAnswerField = (): React.ReactNode => {
    const answerFields = {
      [EAnswerType.INPUT]: ChatInput,
      [EAnswerType.MULTICHOICE]: ChatMultichoice,
      [EAnswerType.CHOICE]: ChatChoice,
      [EAnswerType.PHOTO]: ChatInput,
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
