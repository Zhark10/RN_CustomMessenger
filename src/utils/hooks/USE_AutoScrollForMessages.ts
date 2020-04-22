import React from 'react';
import {ScrollView} from 'react-native';

export const useAutoScrollMessages = () => {
  const scrollView: React.RefObject<ScrollView> = React.useRef(null);
  const autoScrollToEnd = () => {
    const scrollByTime = setTimeout(() => {
      if (scrollView && scrollView.current) {
        scrollView.current.scrollToEnd({animated: true});
      }
    }, 250);
    return () => clearTimeout(scrollByTime);
  };
  return {scrollView, autoScrollToEnd};
};
