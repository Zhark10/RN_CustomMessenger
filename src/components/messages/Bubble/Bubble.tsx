/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, ViewStyle, TextStyle, Alert} from 'react-native';
import Animated from 'react-native-reanimated';
import {DotsLoader} from 'react-native-indicator';
import {isIos} from '../../../utils/helpers/platform';
import {useBubbleAnimation} from '../../../utils/hooks/USE_Bubble_animation';
import {TMessageAddedInStack} from '../../../store/T_ChatProvider';
import {TViewStyles} from '../../../types/T_LibraryInputData';

interface IBubbleProps {
  message?: TMessageAddedInStack;
  viewStyles: TViewStyles;
  wrapperStyles?: ViewStyle;
  messageTextStyles?: TextStyle;
}

export const Bubble: React.FC<IBubbleProps> = ({
  message,
  viewStyles: {bubblesConfigForBot, bubblesConfigForMe},
  wrapperStyles = {},
  messageTextStyles = {},
}) => {
  const sender = message?.sender || 'chatBot'
  const translateY = useBubbleAnimation.translateY(sender);
  const scale = useBubbleAnimation.scale();

  const animationStyles =
    (isIos
      ? {
          transform: [{translateY: translateY.value}],
        }
      : {translateY: translateY.value});

  const isBot = sender === 'chatBot';

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
          backgroundColor: isBot
            ? bubblesConfigForBot.backgroundColor
            : bubblesConfigForMe.backgroundColor,
          marginHorizontal: 24,
          borderRadius: 16,
          alignSelf: isBot ? 'flex-start' : 'flex-end',
          ...wrapperStyles,
        }}>
        {!message ? (
          <View
            style={{
              margin: 16,
              maxHeight: 45,
            }}>
            <DotsLoader color={bubblesConfigForBot.textColor} size={12} />
          </View>
        ) : (
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'SFProText-Regular',
              paddingHorizontal: 16,
              lineHeight: 16,
              paddingVertical: 10,
              color: isBot
                ? bubblesConfigForBot.textColor
                : bubblesConfigForMe.textColor,
              alignSelf: 'center',
              minWidth: 72,
              ...messageTextStyles,
            }}>
            {message!.text}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};
