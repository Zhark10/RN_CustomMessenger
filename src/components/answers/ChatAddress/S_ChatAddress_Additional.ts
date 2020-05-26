import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../../utils/helpers/screen';
import {isIos} from '../../../utils/helpers/platform';

export const ChatAddressAdditionalStyles = StyleSheet.create({
  main: {
    width: screenWidth,
    height: screenHeight,
    zIndex: 999,
    bottom: isIos ? 65 : 0,
    paddingTop: isIos ? 50 : undefined,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 24,
    height: 24,
  },
  form: {
    flex: 1,
  },
  content: {
    paddingBottom: 16,
    flex: 1,
  },
  checkboxText: {
    margin: 2,
    fontSize: 18,
  },
  input: {
    maxHeight: 52,
    borderBottomWidth: 1,
  },
  inputText: {
    fontFamily: 'Circe-Regular',
  },
  dateTitle: {
    fontSize: 18,
    lineHeight: 27,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Circe-Bold',
  },
});
