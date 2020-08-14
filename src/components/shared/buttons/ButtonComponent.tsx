import * as React from 'react'
import { TButtonComponent } from './T_ButtonComponent'
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native'
import { ButtonComponentStyles } from './S_ButtonComponent'

export const ButtonComponent: React.FC<TButtonComponent> = ({
  onPress,
  type,
  title,
  mainColor,
  secondColor,
  disabled,
  style,
}) => {
  const isLightButton = type === 'light'
  const touchableStyles: ViewStyle = {
    borderWidth: 1,
    borderColor: isLightButton ? mainColor : secondColor,
    backgroundColor: isLightButton ? secondColor : mainColor,
  }
  const titleStyles: TextStyle = {
    color: isLightButton ? mainColor : secondColor,
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[ButtonComponentStyles.main, touchableStyles, style]}
      onPress={onPress}
    >
      <Text style={[ButtonComponentStyles.title, titleStyles]}>{title}</Text>
    </TouchableOpacity>
  )
}
