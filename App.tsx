import React from 'react';
import {TLibraryInputData} from './src/utils/types';
import {MessangerStack} from './src/MessangerStack';
import ChatProvider from './src/store/ChatProvider';
console.disableYellowBox = true;

export const StartChat = (libraryInputData: TLibraryInputData) => {
  const ViewForChat = (): React.ReactNode => {
    const createdMessanger = (
      <ChatProvider>
        <MessangerStack {...libraryInputData} />;
      </ChatProvider>
    );
    return createdMessanger;
  };
  return ViewForChat();
};
