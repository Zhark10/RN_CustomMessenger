import React, {FC} from 'react';
import Animated from 'react-native-reanimated';
import {AnswerAnimWrapperStyles} from './AnswerAnimWrapperStyles';
import {useAnswerFieldAnimation} from './AnswerAnimWrapperHook';
import {getAnswerSize} from '../../utils/answer-panel-size-detect';
import {ChatInput} from '../answer-panels/ChatInput/ChatInput';
import {TLibraryInputData} from '../../utils/types';
import {useCurrentMessageInfo} from '../../utils/current-message-info';

export interface IAnswer {
  libraryInputData: TLibraryInputData;
  setAnswerFieldVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnswerAnimHOC = (AnswerView: React.FC<IAnswer>) => {
  const Component: FC<TLibraryInputData> = libraryInputData => {
    const [answerFieldVisible, setAnswerFieldVisible] = React.useState(false);
    const {currentChatBotQuestion} = useCurrentMessageInfo(libraryInputData);
    const answerSize = getAnswerSize(currentChatBotQuestion.myAnswerType, 0);
    const answerFieldAnimation = useAnswerFieldAnimation(
      answerFieldVisible,
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
        {
          <AnswerView
            libraryInputData={libraryInputData}
            setAnswerFieldVisible={setAnswerFieldVisible}
          />
        }
      </Animated.View>
    );
  };
  return Component;
};

export const AnswerView = {
  input: AnswerAnimHOC(ChatInput),
};
