/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {TLibraryInputData} from './src/types/T_LibraryInputData';
import {MessangerStack} from './src';
import ChatProvider from './src/store/ChatProvider';
import {SafeAreaView} from 'react-native';

console.disableYellowBox = true;

const OfflineMessanger: FC<TLibraryInputData> = libraryInputData => (
  <ChatProvider>
    <SafeAreaView style={{flex: 1}}>
      <MessangerStack {...libraryInputData} />
    </SafeAreaView>
  </ChatProvider>
);

export {OfflineMessanger};
