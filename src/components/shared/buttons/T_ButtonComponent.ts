import {GestureResponderEvent} from 'react-native';

export type TButtonComponent = {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  type: 'light' | 'manual';
  mainColor: string;
  secondColor: string;
};
