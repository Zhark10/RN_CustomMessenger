import React from 'react';
import {ScrollView} from 'react-native';

export const useAutoScrollMessages = () => {
  const scrollView: React.RefObject<ScrollView> = React.useRef(null);
  const autoScrollToEnd = () => {
    if (scrollView && scrollView.current) {
      scrollView.current.scrollToEnd({animated: true});
    }
  };
  return {scrollView, autoScrollToEnd};
};
