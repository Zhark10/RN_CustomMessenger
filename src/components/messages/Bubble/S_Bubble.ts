import {StyleSheet} from 'react-native';

export const BubbleStyles = StyleSheet.create({
  main: {
    flex: 1,
  },
  doublePicture: {
    width: 136,
    height: 136,
  },
  onlyPicture: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  firstPictureInDoubleBox: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: 16,
    left: 0,
    borderRadius: 10,
    borderWidth: 2,
  },
  secondPictureInDoubleBox: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: 0,
    left: 16,
    borderRadius: 10,
    borderWidth: 2,
  },
});
