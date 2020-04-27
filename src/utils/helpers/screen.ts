import {Dimensions, Platform, StatusBar, Animated} from 'react-native';

export function getScreenDimensions() {
  const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };

  return screen;
}

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !(Platform as any).isPad &&
    !(Platform as any).isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      (dimen.height === 896 || dimen.width === 896))
  );
}

export function ifIphoneX(iphoneXStyle: any, regularStyle: any) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe: boolean) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}

export function getAnimatedParams() {
  const screenSize = getScreenDimensions();
  const height = screenSize.height;
  const width = screenSize.height;
  const draggableRange = {top: height, bottom: 0};
  const animatedValue = new Animated.Value(draggableRange.bottom);
  return {height, animatedValue, draggableRange, width};
}

export const screenWidth = getScreenDimensions().width;
export const heightWidth = getScreenDimensions().height;
