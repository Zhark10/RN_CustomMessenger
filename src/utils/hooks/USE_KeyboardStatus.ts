import { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'

export const useKeyboardStatus = () => {
  const [keyboardData, setKeyboardData] = useState<{
    keyboardShow: boolean
    keyboardHeight: number
  }>({ keyboardShow: false, keyboardHeight: 0 })

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', event => keyboardDidShow(event))
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', event => keyboardDidHide(event))

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const keyboardDidShow = (event: any) => {
    setKeyboardData({
      keyboardShow: true,
      keyboardHeight: event.endCoordinates.height,
    })
  }

  const keyboardDidHide = (event: any) => {
    setKeyboardData({ keyboardShow: false, keyboardHeight: 0 })
  }

  return keyboardData
}
