import React, {FC} from 'react';
import Animated from 'react-native-reanimated';
import {KeyboardAvoidingView} from 'react-native';

import {TLibraryInputData} from './types/T_LibraryInputData';
import {EAnswerType, TChatProps} from './types';
import {isIos} from './utils/helpers/platform';
import {getAnswerSize} from './utils/helpers/answer-panel-size-detect';

import {useChatMiddleware} from './utils/hooks/USE_ChatMiddleware';
import {
  useAnswerFieldAnimation,
  useAdditionalAnswerFieldAnimation,
} from './utils/hooks/USE_AnswerFieldAnimation';
import {MainStyles} from './styles';
import {
  ChatInput,
  ChatMultichoice,
  ChatChoice,
  ChatPhoto,
  ChatButton,
  ChatPayment,
  ChatDatepicker,
  ChatPaymentAdditional,
} from './components/answers/exports';
import MessagesField from './components/messages/MessagesField/MessagesField';

export const MessangerStack: FC<TLibraryInputData> = libraryInputData => {
  const chatMiddleware = useChatMiddleware(libraryInputData);
  const {
    currentChatBotQuestion: {myAnswer},
    answerFieldVisible,
  } = chatMiddleware;
  const myAnswerType = Object.getOwnPropertyNames(myAnswer)[0];
  const isShowAdditionalPanel = myAnswerType === EAnswerType.PAYMENT;

  const additionalAnswerFieldAnimation = useAdditionalAnswerFieldAnimation(
    answerFieldVisible,
  );
  const chatProps: TChatProps = {
    chatMiddleware,
    libraryInputData,
    setVisibleAdditionalAnswerPanel: additionalAnswerFieldAnimation.setVisible,
  };
  const answerSize = getAnswerSize(myAnswer);
  const answerFieldAnimation = useAnswerFieldAnimation(
    answerFieldVisible,
    answerSize,
  );

  const selectAnswerField = (): React.ReactNode => {
    const answerFields = {
      [EAnswerType.INPUT]: ChatInput,
      [EAnswerType.MULTICHOICE]: ChatMultichoice,
      [EAnswerType.CHOICE]: ChatChoice,
      [EAnswerType.PHOTO]: ChatPhoto,
      [EAnswerType.BUTTON]: ChatButton,
      [EAnswerType.PAYMENT]: ChatPayment,
      [EAnswerType.DATEPICKER]: ChatDatepicker,
    };
    const AnswerField = answerFields[myAnswerType];
    return <AnswerField {...chatProps} />;
  };

  const selectAdditionalPanelForAnswer = (): React.ReactNode => {
    const answerFields = {
      [EAnswerType.PAYMENT]: ChatPaymentAdditional,
    };
    const AdditionalAnswerField = answerFields[myAnswerType];
    return (
      <AdditionalAnswerField
        setVisibleAdditionalAnswerPanel={
          additionalAnswerFieldAnimation.setVisible
        }
        {...chatProps}
      />
    );
  };

  const {answerFieldColor, chatBackgroundColor} = libraryInputData.viewStyles;

  return (
    <>
      <KeyboardAvoidingView
        behavior={isIos ? 'padding' : undefined}
        style={[
          MainStyles.main,
          {
            backgroundColor: chatBackgroundColor,
          },
        ]}>
        <MessagesField answerSize={answerSize} {...chatProps} />
        {libraryInputData.chatHeaderComponent ? (
          libraryInputData.chatHeaderComponent
        ) : (
          <></>
        )}
        <Animated.View
          style={[
            MainStyles.animAnswerPanel,
            {
              height: answerFieldAnimation.offsetValue,
              backgroundColor: answerFieldColor,
            },
          ]}>
          {answerFieldVisible && selectAnswerField()}
        </Animated.View>
      </KeyboardAvoidingView>
      {isShowAdditionalPanel ? (
        <Animated.View
          style={[
            MainStyles.animAdditionalAnswerPanel,
            {
              right: additionalAnswerFieldAnimation.offsetValue,
              backgroundColor: answerFieldColor,
            },
          ]}>
          {answerFieldVisible && selectAdditionalPanelForAnswer()}
        </Animated.View>
      ) : (
        <></>
      )}
    </>
  );
};
