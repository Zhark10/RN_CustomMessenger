/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import { View, Text, ViewStyle, TextStyle, Image } from 'react-native'
import Animated from 'react-native-reanimated'
import { DotsLoader } from 'react-native-indicator'
import { isIos } from '../../../utils/helpers/platform'
import { useBubbleAnimation } from '../../../utils/hooks/USE_BubbleAnimation'
import { TMessageAddedInStack } from '../../../store/T_ChatProvider'
import { TViewStyles } from '../../../types/T_LibraryInputData'
import { BubbleStyles } from './S_Bubble'

interface IBubbleProps {
  message?: TMessageAddedInStack
  viewStyles: TViewStyles
  wrapperStyles?: ViewStyle
  messageTextStyles?: TextStyle
}

export const Bubble: React.FC<IBubbleProps> = React.memo(
  ({
    message,
    viewStyles: { bubblesConfigForBot, bubblesConfigForMe, chatBackgroundColor, buttonColor },
    wrapperStyles = {},
    messageTextStyles = {},
  }) => {
    const sender = (message && message.sender) || 'chatBot'
    const translateY = useBubbleAnimation.translateY(sender)
    const scale = useBubbleAnimation.scale()

    const animationStyles = isIos
      ? {
          transform: [{ translateY: translateY.value }],
        }
      : { translateY: translateY.value }

    const isBot = sender === 'chatBot'

    return (
      <Animated.View
        style={{
          marginTop: 10,
          bottom: scale.value,
          ...animationStyles,
        }}
      >
        <View
          style={{
            ...BubbleStyles.container,
            backgroundColor: isBot
              ? bubblesConfigForBot.backgroundColor
              : message!.twoSidePicture
              ? chatBackgroundColor
              : bubblesConfigForMe.backgroundColor,
            alignSelf: isBot ? 'flex-start' : 'flex-end',
            ...wrapperStyles,
          }}
        >
          {!message ? (
            <View style={BubbleStyles.dotsLoader}>
              <DotsLoader color={bubblesConfigForBot.textColor} size={12} />
            </View>
          ) : message.text ? (
            <Text
              style={{
                ...BubbleStyles.text,
                color: isBot ? bubblesConfigForBot.textColor : bubblesConfigForMe.textColor,
                ...messageTextStyles,
              }}
            >
              {message!.text}
            </Text>
          ) : message.picture ? (
            <Image
              source={isBot ? { uri: message!.picture } : message!.picture[0]}
              style={[BubbleStyles.onlyPicture]}
            />
          ) : message.twoSidePicture ? (
            <View style={BubbleStyles.doublePicture}>
              <Image
                source={message!.twoSidePicture[0]}
                style={[BubbleStyles.firstPictureInDoubleBox, { borderColor: buttonColor }]}
              />
              <Image
                source={message!.twoSidePicture[1]}
                style={[BubbleStyles.secondPictureInDoubleBox, { borderColor: buttonColor }]}
              />
            </View>
          ) : (
            <Image
              style={BubbleStyles.cardImage}
              resizeMode="stretch"
              source={require('../../../../assets/CARD.png')}
            />
          )}
        </View>
      </Animated.View>
    )
  },
)
