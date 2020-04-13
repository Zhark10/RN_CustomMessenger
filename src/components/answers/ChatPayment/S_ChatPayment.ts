import { StyleSheet } from 'react-native';

export const ChatPaymentStyles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  form: {
    marginVertical: 16,
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
  }
});
