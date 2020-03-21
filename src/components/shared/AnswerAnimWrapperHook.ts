import Animated, {Easing} from 'react-native-reanimated';
import React from 'react';

const {Value, timing} = Animated;

export const useAnswerFieldAnimation = (
  answerFieldVisible: boolean,
  answerHeight: number,
  to?: number,
): {offsetValue: Animated.Value<number>} => {
  const [offsetValue] = React.useState(new Value(-500));

  const scaleConfig = {
    toValue: answerFieldVisible ? answerHeight : to || 0,
    duration: 350,
    easing: Easing.inOut(Easing.ease),
  };
  const scaleAnim = timing(offsetValue, scaleConfig);

  React.useEffect(() => {
    scaleAnim.start();
  }, [answerFieldVisible, scaleAnim]);

  return {offsetValue};
};
