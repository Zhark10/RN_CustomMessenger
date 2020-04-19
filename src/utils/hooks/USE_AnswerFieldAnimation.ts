import {screenWidth} from './../../../../../utils/screen';
import Animated, {Easing} from 'react-native-reanimated';
import React from 'react';

const {Value, timing} = Animated;

export const useAnswerFieldAnimation = (
  answerFieldVisible: boolean,
  answerHeight: number,
): {offsetValue: Animated.Value<number>} => {
  const [offsetValue] = React.useState(new Value(-500));

  const scaleConfig = {
    toValue: answerFieldVisible ? answerHeight : 0,
    duration: 250,
    easing: Easing.inOut(Easing.ease),
  };
  const scaleAnim = timing(offsetValue, scaleConfig);

  React.useEffect(() => {
    scaleAnim.start();
  }, [answerFieldVisible, scaleAnim]);

  return {offsetValue};
};

export const useAdditionalAnswerFieldAnimation = (
  answerFieldVisible: boolean,
) => {
  const [isVisible, setVisible] = React.useState(false);
  const [offsetValue] = React.useState(new Value(-screenWidth));

  const scaleConfig = {
    toValue: isVisible ? 0 : -screenWidth,
    duration: 450,
    easing: Easing.inOut(Easing.ease),
  };
  const scaleAnim = timing(offsetValue, scaleConfig);

  React.useEffect(() => {
    scaleAnim.start();
  }, [answerFieldVisible, isVisible, scaleAnim]);

  return {offsetValue, setVisible};
};
