import React from "react";
import { Keyboard } from "react-native";

export const useKeyboardData = () => {
  const [keyboardData, setKeyboardData] = React.useState<{
    keyboardShow: boolean;
    keyboardHeight: number;
  }>({keyboardShow: false, keyboardHeight: 0});

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => keyboardDidShow(event)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      (event) => keyboardDidHide(event)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const keyboardDidShow = (event: any) => {
    setKeyboardData({
      keyboardShow: true,
      keyboardHeight: event.endCoordinates.height,
    });
  };

  const keyboardDidHide = (event: any) => {
    setKeyboardData({ keyboardShow: false, keyboardHeight: 0 });
  };

  return keyboardData
}