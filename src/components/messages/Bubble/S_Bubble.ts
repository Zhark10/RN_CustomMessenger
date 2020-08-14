import {StyleSheet} from 'react-native';

export const BubbleStyles = StyleSheet.create({
  container: {
    maxWidth: '60%',
    minHeight: 45,
    flexDirection: 'row',
    marginHorizontal: 24,
    borderRadius: 16,
  },
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
  text: {
    fontSize: 16,
    fontFamily: 'Circe-Regular',
    paddingHorizontal: 16,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  cardImage: {
    width: 191,
    height: 120,
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
  dotsLoader: {
    margin: 16,
    maxHeight: 45,
  },
});
