import React from 'react';
import {TLibraryInputData} from './src/utils/types';
import {MessangerStack} from './src/MessangerStack';
import ChatProvider from './src/store/ChatProvider';
console.disableYellowBox = true;

const OfflineMessanger = (libraryInputData: TLibraryInputData) => (
  <ChatProvider>
    <MessangerStack {...libraryInputData} />
  </ChatProvider>
);

export {OfflineMessanger};
