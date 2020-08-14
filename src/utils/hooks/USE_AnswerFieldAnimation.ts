import Animated, { Easing } from 'react-native-reanimated'
import { useState, useEffect } from 'react'

import { screenWidth } from '../helpers/screen'

const { Value, timing } = Animated

export const useAnswerFieldAnimation = (
  answerFieldVisible: boolean,
  answerHeight?: number,
): { offsetValue: Animated.Value<number> } => {
  const [offsetValue] = useState(new Value(-500))

  const scaleConfig = {
    toValue: (answerFieldVisible && answerHeight) ? answerHeight : 0,
    duration: 250,
    easing: Easing.inOut(Easing.ease),
  }
  const scaleAnim = timing(offsetValue, scaleConfig)

  useEffect(() => {
    scaleAnim.start()
  }, [answerFieldVisible, scaleAnim])

  return { offsetValue }
}

export const useAdditionalAnswerFieldAnimation = (answerFieldVisible: boolean) => {
  const [isVisible, setVisible] = useState(false)
  const [offsetValue] = useState(new Value(-screenWidth))

  const scaleConfig = {
    toValue: isVisible ? 0 : -screenWidth,
    duration: 450,
    easing: Easing.inOut(Easing.ease),
  }
  const scaleAnim = timing(offsetValue, scaleConfig)

  useEffect(() => {
    scaleAnim.start()
  }, [answerFieldVisible, isVisible, scaleAnim])

  return { offsetValue, setVisible }
}
