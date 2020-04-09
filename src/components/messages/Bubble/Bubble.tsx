/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, ViewStyle, TextStyle, Image} from 'react-native';
import Animated from 'react-native-reanimated';
import {DotsLoader} from 'react-native-indicator';
import {isIos} from '../../../utils/helpers/platform';
import {useBubbleAnimation} from '../../../utils/hooks/USE_Bubble_animation';
import {TMessageAddedInStack} from '../../../store/T_ChatProvider';
import {TViewStyles} from '../../../types/T_LibraryInputData';
import {BubbleStyles} from './S_Bubble';

interface IBubbleProps {
  message?: TMessageAddedInStack;
  viewStyles: TViewStyles;
  wrapperStyles?: ViewStyle;
  messageTextStyles?: TextStyle;
}

export const Bubble: React.FC<IBubbleProps> = React.memo(
  ({
    message,
    viewStyles: {
      bubblesConfigForBot,
      bubblesConfigForMe,
      chatBackgroundColor,
      buttonColor,
    },
    wrapperStyles = {},
    messageTextStyles = {},
  }) => {
    const sender = (message && message.sender) || 'chatBot';
    const translateY = useBubbleAnimation.translateY(sender);
    const scale = useBubbleAnimation.scale();

    const animationStyles = isIos
      ? {
          transform: [{translateY: translateY.value}],
        }
      : {translateY: translateY.value};

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
              : message!.twoSidePicture
              ? chatBackgroundColor
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
              <DotsLoader color={buttonColor} size={12} />
            </View>
          ) : message.text ? (
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 16,
                lineHeight: 16,
                paddingVertical: 10,
                color: isBot
                  ? bubblesConfigForBot.textColor
                  : bubblesConfigForMe.textColor,
                alignSelf: 'center',
                ...messageTextStyles,
              }}>
              {message!.text}
            </Text>
          ) : message.picture ? (
            <Image
              source={message!.picture[0]}
              style={[BubbleStyles.onlyPicture, {borderColor: buttonColor}]}
            />
          ) : (
            <View style={BubbleStyles.doublePicture}>
              <Image
                source={message!.twoSidePicture[0]}
                style={[
                  BubbleStyles.firstPictureInDoubleBox,
                  {borderColor: buttonColor},
                ]}
              />
              <Image
                source={message!.twoSidePicture[1]}
                style={[
                  BubbleStyles.secondPictureInDoubleBox,
                  {borderColor: buttonColor},
                ]}
              />
            </View>
          )}
        </View>
      </Animated.View>
    );
  },
);
