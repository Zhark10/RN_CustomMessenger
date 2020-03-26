import {StyleSheet} from 'react-native';

export const MainStyles = StyleSheet.create({
  main: {
    flex: 1,
  },
  anim: {
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
});
