import {StyleSheet} from 'react-native';
import {screenWidth} from './utils/helpers/screen';

export const MainStyles = StyleSheet.create({
  main: {
    flex: 1,
  },
  animAnswerPanel: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  animAdditionalAnswerPanel: {
    flex: 1,
    zIndex: 9999,
    width: screenWidth,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    position: 'absolute',
  },
});
