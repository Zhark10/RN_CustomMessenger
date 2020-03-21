/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TLibraryInputData} from './src/utils/types';
import {MessangerStack} from './src';
import ChatProvider from './src/store/ChatProvider';
import {SafeAreaView} from 'react-native';
console.disableYellowBox = true;

const OfflineMessanger = (libraryInputData: TLibraryInputData) => (
  <ChatProvider>
    <SafeAreaView style={{flex: 1}}>
      <MessangerStack {...libraryInputData} />
    </SafeAreaView>
  </ChatProvider>
);

export {OfflineMessanger};
