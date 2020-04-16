import {StyleSheet} from 'react-native';
import {screenHeight} from '../../../utils/helpers/screen';

export const ChatAddressAdditionalStyles = StyleSheet.create({
  main: {
    width: '100%',
    height: screenHeight - 80,
    paddingHorizontal: 16,
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
