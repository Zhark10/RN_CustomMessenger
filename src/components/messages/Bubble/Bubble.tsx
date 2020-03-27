/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {DotsLoader} from 'react-native-indicator';
import {isIos} from '../../../utils/helpers/platform';
import {useBubbleAnimation} from '../../../utils/hooks/USE_Bubble_animation';
import {TMessageAddedInStack} from '../../../store/T_ChatProvider';

interface IBubbleProps {
  message: TMessageAddedInStack;
  isTyping?: boolean;
  isLastMessage?: boolean;
  wrapperStyles?: ViewStyle;
  messageTextStyles?: TextStyle;
}

export const Bubble: React.FC<IBubbleProps> = ({
  message: {sender, text},
  isTyping,
  isLastMessage,
  wrapperStyles = {},
  messageTextStyles = {},
}) => {
  const translateY = useBubbleAnimation.translateY(sender);
  const scale = useBubbleAnimation.scale();

  const animationStyles =
    (isLastMessage || isTyping) &&
    (isIos
      ? {
          transform: [{translateY: translateY.value}],
        }
      : {translateY: translateY.value});

  const answerCapitalized = text
    ? text.charAt(0).toUpperCase() + text.slice(1)
    : '';
  const isAssistant = sender === 'chatBot';

  return (
    <Animated.View
      style={{
        marginTop: 10,
        bottom: scale.value,
        ...animationStyles,
      }}>
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
              fontSize: 14,
              fontFamily: 'SFProText-Regular',
              paddingHorizontal: 16,
              lineHeight: 16,
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
