import {StyleSheet} from 'react-native';

export const ChatInputStyles = StyleSheet.create({
  main: {
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 16,
    margin: 16,
  },
  input: {
    flex: 1,
    fontFamily: 'Circe-Regular',
    marginLeft: 15,
    height: 42,
    fontSize: 16,
  },
});
