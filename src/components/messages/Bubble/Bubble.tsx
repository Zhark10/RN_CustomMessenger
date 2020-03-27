import * as React from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import { isIos } from '../../../utils/helpers/platform';
import { useBubbleAnimation } from 'src/utils/hooks/USE_Bubble_animation';
import { ISender } from 'src/store/T_ChatProvider';

interface IQuizMessageProps {
  answer?: string;
  sender: ISender;
  isTyping?: boolean;
  isLastMessage?: boolean;
  wrapperStyles?: ViewStyle;
  messageTextStyles?: TextStyle;
}

export const QuizMessage: React.FC<IQuizMessageProps> = ({
  answer,
  sender,
  isTyping,
  isLastMessage,
  wrapperStyles = {},
  messageTextStyles = {},
}) => {
  const translateY = useBubbleAnimation.translate(sender);
  const scale = useBubbleAnimation.useScaleAnimation();

  const animationStyles =
    (isLastMessage || isTyping) &&
    (isIos
      ? {
          transform: [{translateY: translateY.value}],
        }
      : {translateY: translateY.value});

  const answerCapitalized = answer
    ? answer.charAt(0).toUpperCase() + answer.slice(1)
    : '';
  const isAssistant = sender === 'assistant';

  return (
    <Animated.View
      style={{
        marginTop: 10,
        bottom: scale.value,
        ...animationStyles,
      }}>
      {isAssistant ? (
        <View
          style={{
            position: 'absolute',
            bottom: -5,
            left: 20,
            minHeight: 45,
          }}>
          <TailForAssistantMessage />
        </View>
      ) : (
        <View
          style={{
            position: 'absolute',
            bottom: -3,
            marginHorizontal: 20,
            right: 0,
          }}>
          <TailForMeMessage />
        </View>
      )}
      <View
        style={{
          maxWidth: '60%',
          minHeight: 45,
          flexDirection: 'row',
          backgroundColor: isAssistant ? '#f3f3f3' : '#33B49D',
          marginHorizontal: 24,
          borderRadius: 16,
          alignSelf: isAssistant ? 'flex-start' : 'flex-end',
          ...wrapperStyles,
        }}>
        {isTyping ? (
          <View
            style={{
              margin: 16,
              maxHeight: 45,
            }}>
            <DotsLoader color="#33B49D" size={12} />
          </View>
        ) : (
          <Text
            style={{
              fontSize: fsize(14),
              fontFamily: 'SFProText-Regular',
              paddingHorizontal: 16,
              lineHeight: fsize(16),
              paddingVertical: 10,
              color: isAssistant ? 'rgba(0,0,0,.87)' : '#fff',
              alignSelf: 'center',
              minWidth: 72,
              ...messageTextStyles,
            }}>
            {answerCapitalized}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};
