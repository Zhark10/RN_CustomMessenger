import React, {FC} from 'react';
import Animated from 'react-native-reanimated';
import {AnswerAnimWrapperStyles} from './AnswerAnimWrapperStyles';
import {useAnswerFieldAnimation} from './AnswerAnimWrapperHook';
import {getAnswerSize} from '../../utils/answer-panel-size-detect';
import {ChatInput} from '../answer-panels/ChatInput/ChatInput';
import {TLibraryInputData} from '../../utils/types';
import {TUseChatMiddleware} from '../../utils/current-message-info';
import {ChatMultichoice} from '../answer-panels/ChatMultichoice/ChatMultichoice';

export interface IAnswer {
  libraryInputData: TLibraryInputData;
  chatMiddleware: TUseChatMiddleware;
}

const AnswerAnimHOC = (AnswerView: React.FC<IAnswer>) => {
  const Component: FC<IAnswer> = ({libraryInputData, chatMiddleware}) => {
    const answerSize = getAnswerSize(
      chatMiddleware.currentChatBotQuestion.myAnswerType,
      0,
    );
    const answerFieldAnimation = useAnswerFieldAnimation(
      chatMiddleware.answerFieldVisible,
      answerSize,
    );

    return (
      <Animated.View
        style={[
          AnswerAnimWrapperStyles.main,
          {
            height: answerFieldAnimation.offsetValue,
          },
        ]}>
        {chatMiddleware.answerFieldVisible && (
          <AnswerView
            libraryInputData={libraryInputData}
            chatMiddleware={chatMiddleware}
          />
        )}
      </Animated.View>
    );
  };
  return Component;
};

export const AnswerView = {
  Input: AnswerAnimHOC(ChatInput),
  Multichoice: AnswerAnimHOC(ChatMultichoice),
};
