// /* eslint-disable react-hooks/exhaustive-deps */
// import React, {FC} from 'react';
// import Animated from 'react-native-reanimated';
// import {AnswerAnimWrapperStyles} from './AnswerAnimWrapperStyles';
// import {useAnswerFieldAnimation} from './AnswerAnimWrapperHook';
// import {getAnswerSize} from '../../utils/answer-panel-size-detect';
// import {ChatInput} from '../answer-panels/ChatInput/ChatInput';
// import {TLibraryInputData} from '../../utils/types';
// import {TUseChatMiddleware} from '../../utils/current-message-info';
// import {ChatMultichoice} from '../answer-panels/ChatMultichoice/ChatMultichoice';
// import {Alert} from 'react-native';

// export interface IAnswer {
//   libraryInputData: TLibraryInputData;
//   chatMiddleware: TUseChatMiddleware;
// }

// export const AnswerAnimWrapper: FC<IAnswer> = ({chatMiddleware, children}) => {

//   return (
//     <Animated.View
//       style={[
//         AnswerAnimWrapperStyles.main,
//         {
//           height: answerFieldAnimation.offsetValue,
//         },
//       ]}>
//       {children}
//     </Animated.View>
//   );
// };
