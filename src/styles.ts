import {StyleSheet} from 'react-native';
import {screenWidth} from './utils/helpers/screen';

export const MainStyles = StyleSheet.create({
  main: {
    flex: 1,
  },
  animAnswerPanel: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -12,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8.0,
    elevation: 8,
  },
  animAdditionalAnswerPanel: {
    flex: 1,
    zIndex: 9999,
    width: screenWidth,
    backgroundColor: '#fff',
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
  animAdditionalAnswerPanelIos: {
    flex: 1,
    zIndex: 9999,
    width: screenWidth,
    position: 'absolute',
  },
});
