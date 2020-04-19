import {StyleSheet} from 'react-native';
import {screenHeight} from '../../../utils/helpers/screen';

export const ChatPaymentAdditionalStyles = StyleSheet.create({
  main: {
    width: '100%',
    height: screenHeight - 80,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 24,
    height: 24,
  },
  form: {
    paddingBottom: 16,
    flex: 1,
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
  checkboxBlock: {
    marginLeft: 4,
    marginVertical: 6,
    height: 22,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  checkboxText: {
    fontFamily: 'Circe-Regular',
    marginLeft: 11,
    fontSize: 18,
  },
});
